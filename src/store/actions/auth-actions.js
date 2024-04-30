import axios from "axios";
import {
    AuthActionTypes,
    CLIENT_ID,
    CLIENT_SECRET, INTROSPECTION_ENDPOINT, LOGOUT_ENDPOINT,
    OAUTH2_AUTHORIZATION_ENDPOINT, OAUTH2_TOKEN_ENDPOINT,
    REDIRECT_URI,
    SSO_URL
} from "../constants";
import {
    clearTokens,
    getAccessToken,
    getRefreshToken, hasRefreshToken
} from "../token-manager";

function generateClientAuthPayload() {
    return 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
}

export function performAuthorization() {
    console.log("Action: [performAuthorization]")
    return dispatch => {
        window.location.replace(`${SSO_URL}${OAUTH2_AUTHORIZATION_ENDPOINT}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`)
    }
}

export function performLogout() {
    console.log("Action: [performLogout]")
    const origin = new URL(REDIRECT_URI).origin
    return () => {
        clearTokens()
        window.location.replace(`${SSO_URL}${LOGOUT_ENDPOINT}?redirect=${origin}`)
    }
}

export function exchangeCodeToToken(code) {
    console.log("Action: [exchangeCodeToToken]")
    return dispatch => {
        let payload = new FormData()
        payload.append('grant_type', 'authorization_code')
        payload.append('code', code)
        payload.append('redirect_uri', REDIRECT_URI)
        payload.append('client_id', CLIENT_ID)
        return axios.post(SSO_URL + OAUTH2_TOKEN_ENDPOINT, payload, {
                headers: {
                    'Content-type': 'application/url-form-encoded',
                    'Authorization': generateClientAuthPayload()
                }
            }
        ).then(response => {
            dispatch({type: AuthActionTypes.authorize, payload: {access: response.data["access_token"], refresh: response.data["refresh_token"]}})
        }).catch(err => {
            console.log(`HTTP request to [${OAUTH2_TOKEN_ENDPOINT}] failed with error:` + err)
        })
    }
}

export function introspectToken() {
    console.log("Action: [introspectToken]")
    return dispatch => {
        let payload = new FormData()
        payload.append('token', getAccessToken())
        return axios.post(SSO_URL + INTROSPECTION_ENDPOINT, payload, {
            headers: {
                'Content-type': 'application/url-form-encoded',
                'Authorization': generateClientAuthPayload()
            }
        }).then(res => {
            if (!res.data.active) {
                if (hasRefreshToken()) {
                    dispatch(refreshAccessToken())
                } else {
                    dispatch({type: AuthActionTypes.updateTokenState, payload: false})
                }
            } else {
                dispatch({type: AuthActionTypes.updateTokenState, payload: true})
            }

        }).catch(err => {
            console.log(`HTTP request to [${INTROSPECTION_ENDPOINT}] failed with error:` + err)
            if (hasRefreshToken()) {
                dispatch(refreshAccessToken())
            } else {
                dispatch({type: AuthActionTypes.updateTokenState, payload: false})
            }
        });
    }
}

export function refreshAccessToken() {
    console.log("Action: [refreshAccessToken]")
    return dispatch => {
        let payload = new FormData()
        payload.append('grant_type', 'refresh_token')
        payload.append('refresh_token', getRefreshToken())
        payload.append('redirect_uri', REDIRECT_URI)
        payload.append('client_id', CLIENT_ID)
        return axios.post(SSO_URL + OAUTH2_TOKEN_ENDPOINT, payload, {
            headers: {
                'Content-type': 'application/url-form-encoded',
                'Authorization': generateClientAuthPayload()
            }
        }).then(response => {
            dispatch({type: AuthActionTypes.refreshAccessToken, payload: {access: response.data["access_token"], refresh: response.data["refresh_token"]}})
            dispatch(introspectToken())
        }).catch(err => {
            console.log(`HTTP request to [${OAUTH2_TOKEN_ENDPOINT}] failed with error:` + err)
            dispatch({type: AuthActionTypes.updateTokenState, payload: false})
        });
    }
}
