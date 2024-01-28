const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export function setAccessToken(token) {
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function setRefreshToken(token) {
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function getAccessToken() {
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY)
}

export function hasAccessToken() {
    const v = window.sessionStorage.getItem(ACCESS_TOKEN_KEY)
    return v !== null && v !== "" && v !== "undefined"
}

export function hasRefreshToken() {
    const v = window.sessionStorage.getItem(REFRESH_TOKEN_KEY)
    return v !== null && v !== "" && v !== "undefined"
}

export function hasTokens() {
    return hasAccessToken() && hasRefreshToken()
}

export function clearTokens() {
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, undefined);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, undefined);
}