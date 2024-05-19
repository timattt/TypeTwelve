import messengerReducer from "./slices/messenger-slice";
import authReducer from "./slices/auth-slice"
import {configureStore} from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        messages: messengerReducer,
        auth: authReducer
    },
});