import {initialState} from "../models/initial-state";
import {MessengerActionTypes} from "../constants";

export const messengerReducer = (state = initialState(), action) => {
    switch (action.type) {
        case MessengerActionTypes.sendMessage:
            return {...state, messages: [...state.messages, action.payload]};
        case MessengerActionTypes.getAfter:
            return {...state, messages: [...state.messages, ...action.payload]};
        case MessengerActionTypes.getBefore:
            return {...state, messages: [...state.messages, ...action.payload]};
        default: {
            return state
        }
    }
}