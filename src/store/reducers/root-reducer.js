import {combineReducers} from "redux";
import {authReducer} from "./auth-reducer";
import {userInfoReducer} from "./user-info-reducer";

export const rootReducer = combineReducers({
    authReducer,
    userInfoReducer
})