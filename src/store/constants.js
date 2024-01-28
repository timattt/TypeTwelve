export const AuthActionTypes = {
    authorize: "AUTHORIZE",
    updateTokenState: "CHECK_TOKEN_VALID",
    refreshAccessToken: "REFRESH_ACCESS_TOKEN",
}

export const UserInfoActionTypes = {
    loadAll: "LOAD_ALL",
    register: "REGISTER"
}

export const availableGroups = ["Б05-311", "Б05-251"]

export const serverUrl = process.env.REACT_APP_TYPE8_SERVER_IP
export const clientId = process.env.REACT_APP_TYPE8_CLIENT_ID
export const clientSecret = process.env.REACT_APP_TYPE8_CLIENT_SECRET
export const redirectUri = process.env.REACT_APP_TYPE8_REDIRECT_URI
export const metadataServerUrl = process.env.REACT_APP_TYPE8_METADATA_SERVER_IP