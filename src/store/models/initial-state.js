import {hasTokens} from "../token-manager";
import {userRoles} from "../constants";

export const initialState = () => ({
    authorized: hasTokens() && window.location.pathname !== "/code",
    // this is to ensure that it is not authorized when entering /code page
    userInfo: undefined,
    student: undefined,
    tests: undefined,
    role: userRoles.student
})