import {AuthActionTypes, metadataServerUrl, UserInfoActionTypes} from "../constants";
import {getAccessToken, hasRefreshToken} from "../token-manager";
import {refreshAccessToken} from "./auth-actions";
import axios from "axios";


/**
 * Used in: private-route, refresh-token, match-page
 * @returns {function(*): Promise<void>}
 */
export function loadAll() {
    console.log("Action: [loadAll]")
    return dispatch => {
        return axios.get(metadataServerUrl + '/teaching/get_all', {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }})
            .then(res => {
                dispatch({type: AuthActionTypes.updateTokenState, payload: true})
                dispatch({type: UserInfoActionTypes.loadAll, payload: res.data})
            }).catch(err => {
                console.log("HTTP request to [/teaching/get_all] failed with error:" + err)
                if (hasRefreshToken()) {
                    dispatch(refreshAccessToken())
                } else {
                    dispatch({type: AuthActionTypes.updateTokenState, payload: false})
                }
            })
        }
}

export function register(group) {
    console.log("Action: [register]")
    return dispatch => {
        return axios.post(metadataServerUrl + '/teaching/register', {group: group}, {
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }})
            .then(res => {
                dispatch({type: AuthActionTypes.updateTokenState, payload: true})
                dispatch({type: UserInfoActionTypes.register, payload: res.data})
            }).catch(err => {
                console.log("HTTP request to [/teaching/register] failed with error:" + err)
                if (hasRefreshToken()) {
                    dispatch(refreshAccessToken())
                } else {
                    dispatch({type: AuthActionTypes.updateTokenState, payload: false})
                }
            })
    }
}