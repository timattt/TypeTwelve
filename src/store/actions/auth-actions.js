import axios from "axios";
import {AuthActionTypes, clientId, clientSecret, redirectUri, serverUrl} from "../constants";
import {
    clearTokens,
    getAccessToken,
    getRefreshToken, hasRefreshToken
} from "../token-manager";

function generateClientAuthPayload() {
    return 'Basic ' + btoa(clientId + ":" + clientSecret)
}

const OAUTH2_TOKEN_ENDPOINT = "/sso/oauth2/token"
const OAUTH2_AUTHORIZATION_ENDPOINT = "/sso/oauth2/authorize"
const LOGOUT_ENDPOINT = "/sso/logout"
const INTROSPECTION_ENDPOINT = '/sso/oauth2/introspect'

export function performAuthorization() {
    console.log(serverUrl)
    console.log("Action: [performAuthorization]")
    return dispatch => {
        window.location.replace(`${serverUrl}${OAUTH2_AUTHORIZATION_ENDPOINT}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`)
    }
}

export function performLogout() {
    const origin = new URL(redirectUri).origin
    console.log("Action: [performLogout]")
    console.log(`${serverUrl}${LOGOUT_ENDPOINT}?redirect=${origin}`)
    return () => {
        clearTokens()
        window.location.replace(`${serverUrl}${LOGOUT_ENDPOINT}?redirect=${origin}`)
    }
}

export function exchangeCodeToToken(code) {
    console.log("Action: [exchangeCodeToToken]")
    return dispatch => {
        let payload = new FormData()
        payload.append('grant_type', 'authorization_code')
        payload.append('code', code)
        payload.append('redirect_uri', redirectUri)
        payload.append('client_id', clientId)
        return axios.post(serverUrl + OAUTH2_TOKEN_ENDPOINT, payload, {
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
        return axios.post(serverUrl + INTROSPECTION_ENDPOINT, payload, {
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

/**
 * Used as chain from this file
 * @returns {function(*): Promise<void>}
 */
export function refreshAccessToken() {
    console.log("Action: [refreshAccessToken]")
    return dispatch => {
        let payload = new FormData()
        payload.append('grant_type', 'refresh_token')
        payload.append('refresh_token', getRefreshToken())
        payload.append('redirect_uri', redirectUri)
        payload.append('client_id', clientId)
        return axios.post(serverUrl + OAUTH2_TOKEN_ENDPOINT, payload, {
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
