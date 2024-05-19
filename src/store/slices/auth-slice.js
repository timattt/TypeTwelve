import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {
    CLIENT_ID,
    CLIENT_SECRET, INTROSPECTION_ENDPOINT, INTROSPECTION_FAIL_RESULT, LOGOUT_ENDPOINT,
    OAUTH2_AUTHORIZATION_ENDPOINT, OAUTH2_TOKEN_ENDPOINT,
    REDIRECT_URI,
    SSO_URL
} from "../constants";
import {
    clearTokens,
    getAccessToken,
    getRefreshToken, hasRefreshToken, hasTokens, setAccessToken, setRefreshToken
} from "../token-manager";

function generateClientAuthPayload() {
    return 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
}

export const performAuthorization = createAsyncThunk(
    'messenger/performAuthorization',
    async function(_, {rejectWithValue, dispatch}) {
        window.location.replace(`${SSO_URL}${OAUTH2_AUTHORIZATION_ENDPOINT}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`)
        return {}
    }
);

export const performLogout = createAsyncThunk(
    'messenger/performLogout',
    async function(_, {rejectWithValue, dispatch}) {
        clearTokens()
        const origin = new URL(REDIRECT_URI).origin
        window.location.replace(`${SSO_URL}${LOGOUT_ENDPOINT}?redirect=${origin}`)
        return {}
    }
);

export const exchangeCodeToToken = createAsyncThunk(
    'messenger/exchangeCodeToToken',
    async function(code, {rejectWithValue, dispatch}) {
        try {
            let payload = new FormData()
            payload.append('grant_type', 'authorization_code')
            payload.append('code', code)
            payload.append('redirect_uri', REDIRECT_URI)
            payload.append('client_id', CLIENT_ID)
            const response = await axios.post(SSO_URL + OAUTH2_TOKEN_ENDPOINT, payload, {
                    headers: {
                        'Content-type': 'application/url-form-encoded',
                        'Authorization': generateClientAuthPayload()
                    }
                }
            )

            return {access: response.data["access_token"], refresh: response.data["refresh_token"]}
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const introspectToken = createAsyncThunk(
    'messenger/introspectToken',
    async function(_, thunkAPI) {
        try {
            let payload = new FormData()
            payload.append('token', getAccessToken())

            const response = await axios.post(SSO_URL + INTROSPECTION_ENDPOINT, payload, {
                headers: {
                    'Content-type': 'application/url-form-encoded',
                    'Authorization': generateClientAuthPayload()
                }
            })

            if (!response.data.active && hasRefreshToken()) {
                thunkAPI.dispatch(refreshAccessToken())
                return thunkAPI.rejectWithValue()
            }

            return thunkAPI.fulfillWithValue(response.data.active)
        } catch (error) {
            return thunkAPI.rejectWithValue()
        }
    }
);

export const refreshAccessToken = createAsyncThunk(
    'messenger/refreshAccessToken',
    async function(_, {rejectWithValue, dispatch}) {
        try {
            let payload = new FormData()
            payload.append('grant_type', 'refresh_token')
            payload.append('refresh_token', getRefreshToken())
            payload.append('redirect_uri', REDIRECT_URI)
            payload.append('client_id', CLIENT_ID)

            const response = await axios.post(SSO_URL + OAUTH2_TOKEN_ENDPOINT, payload, {
                headers: {
                    'Content-type': 'application/url-form-encoded',
                    'Authorization': generateClientAuthPayload()
                }
            })

            return {access: response.data["access_token"], refresh: response.data["refresh_token"]}
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

function onError(state, action) {
    console.log("Error happened in auth-slice " + action.type)
    clearTokens()
    state.authorized = false
}

function withLog(reducer) {
    return (state, action) => {
        console.log("Auth action: [" + action.type + "] payload: " + JSON.stringify(action.payload))
        return reducer(state, action)
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authorized: hasTokens() && window.location.pathname !== "/code"
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                exchangeCodeToToken.fulfilled,
                withLog((state, action) => {
                    setAccessToken(action.payload.access)
                    setRefreshToken(action.payload.refresh)
                    state.authorized = true
                })
            )
            .addCase(exchangeCodeToToken.rejected, onError)
            .addCase(
                introspectToken.fulfilled,
                withLog((state, action) => {
                    if (!action.payload) {
                        clearTokens()
                    }
                    state.authorized = action.payload
                })
            )
            .addCase(
                introspectToken.rejected,
                withLog((state, action) => {
                    console.log("Failed to introspect token")
                })
            )
            .addCase(
                refreshAccessToken.fulfilled,
                withLog((state, action) => {
                    setAccessToken(action.payload.access)
                    setRefreshToken(action.payload.refresh)
                    state.authorized = true
                })
            )
            .addCase(refreshAccessToken.rejected, onError)
    }
});

export default authSlice.reducer;
