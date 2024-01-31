import {initialState} from "../models/initial-state";
import {UserInfoActionTypes, userRoles} from "../constants";

export const userInfoReducer = (state = initialState(), action) => {
    switch (action.type) {
        case UserInfoActionTypes.loadAll:
            console.log("REDUCER: [loaded all]")
            return {...state, userInfo: action.payload.user, student: action.payload.student, tests: action.payload.tests, role: action.payload.isAdmin ? userRoles.admin : userRoles.student}
        case UserInfoActionTypes.register:
            console.log("REDUCER: [registered]")
            console.log(action.payload)
            return {...state, userInfo: action.payload.user, student: action.payload.student, tests: action.payload.tests, role: action.payload.isAdmin ? userRoles.admin : userRoles.student}
        default: {
            return state
        }
    }
}