import {hasTokens} from "../token-manager";

export const initialState = () => ({
    authorized: hasTokens() && window.location.pathname !== "/code",
    // this is to ensure that it is not authorized when entering /code page
    messages: []
})