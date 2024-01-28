import {initialState} from "../models/initial-state";
import {UserInfoActionTypes} from "../constants";

export const userInfoReducer = (state = initialState(), action) => {
    switch (action.type) {
        case UserInfoActionTypes.loadAll:
            console.log("REDUCER: [loaded all]")
            return {...state, userInfo: action.payload.user, student: action.payload.student}
        case UserInfoActionTypes.register:
            console.log("REDUCER: [registered]")
            console.log(action.payload)
            return {...state, userInfo: action.payload.user, student: action.payload.student}
        default: {
            return state
        }
    }
}