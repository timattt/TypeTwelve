export const AuthActionTypes = {
    authorize: "AUTHORIZE",
    updateTokenState: "CHECK_TOKEN_VALID",
    refreshAccessToken: "REFRESH_ACCESS_TOKEN",
}

export const serverUrl = process.env.REACT_APP_TYPE8_SERVER_IP
export const clientId = process.env.REACT_APP_TYPE8_CLIENT_ID
export const clientSecret = process.env.REACT_APP_TYPE8_CLIENT_SECRET
export const redirectUri = process.env.REACT_APP_TYPE8_REDIRECT_URI