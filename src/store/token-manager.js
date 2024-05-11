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

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function getSelfEmail() {
    const res = parseJwt(getAccessToken())
    return res.email;
}