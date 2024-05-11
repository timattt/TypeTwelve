import {combineReducers} from "redux";
import {authReducer} from "./auth-reducer";
import {messengerReducer} from "./messenger-reducer";

export const rootReducer = combineReducers({
    authReducer, messengerReducer
})