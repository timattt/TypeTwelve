import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {clearTokens, getAccessToken} from "../token-manager";
import {MessengerClient} from "../../proto/messenger_grpc_web_pb";
import {TYPE11_URL} from "../constants";
import {EmptyRequest, NewChatRequest, SendMessageRequest, ListMessagesRequest} from "../../proto/messenger_pb";

const client = new MessengerClient(TYPE11_URL, null, null);

export const listUsersGrpcCall = createAsyncThunk(
    'messages/listUsersGrpcCall',
    async function(_, thunkAPI) {
        try {
            const empty = new EmptyRequest()
            const result = await new Promise((resolve, reject) => {
                client.listUsers(empty, {"Authorization": "Bearer " + getAccessToken()}, (err, result) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(result);
                    }
                })
            })
            return thunkAPI.fulfillWithValue(result.array[0].map(user => {
                return {
                    id: user[0],
                    email: user[1],
                    firstName: user[2],
                    lastName: user[3]
                }
            }))
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const listChatsGrpcCall = createAsyncThunk(
    'messages/listChatsGrpcCall',
    async function(_, thunkAPI) {
        try {
            const empty = new EmptyRequest()
            const result = await new Promise((resolve, reject) => {
                client.listChats(empty, {"Authorization": "Bearer " + getAccessToken()}, (err, result) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(result);
                    }
                })
            })
            return thunkAPI.fulfillWithValue(result.array[0].map(chat => {
                    return {
                        id: chat[0],
                        users: chat[1]
                    }
                }))
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const createNewChatGrpcCall = createAsyncThunk(
    'messages/createNewChatGrpcCall',
    async function(receiverId, thunkAPI) {
        try {
            const req = new NewChatRequest()
            req.setReceiverid(receiverId)
            const result = await new Promise((resolve, reject) => {
                client.newChat(req, {"Authorization": "Bearer " + getAccessToken()}, (err, result) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(result);
                    }
                })
            })
            return thunkAPI.fulfillWithValue({
                id: result.array[0][0],
                users: result.array[0][1],
                messages: []
            })
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const sendMessageGrpcCall = createAsyncThunk(
    'messages/sendMessageGrpcCall',
    async function({chatId, content}, thunkAPI) {
        try {
            const req = new SendMessageRequest()
            req.setChatid(chatId)
            req.setContent(content)
            const result = await new Promise((resolve, reject) => {
                client.sendMessage(req, {"Authorization": "Bearer " + getAccessToken()}, (err, result) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(result);
                    }
                })
            })
            return thunkAPI.fulfillWithValue({
                id: result.array[0][0],
                content: result.array[0][1],
                time: result.array[0][2],
                chatId: result.array[0][3],
                senderId: result.array[0][4]
            })
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const exchangeGrpcCall = createAsyncThunk(
    'messages/exchangeGrpcCall',
    async function(_, thunkAPI) {
        try {
            const req = new EmptyRequest()
            const stream = client.receiveMessages(req, {"Authorization": "Bearer " + getAccessToken()})
            stream.on('data', (chunk) => {
                thunkAPI.dispatch(newMessage({
                        id: chunk.array[0][0],
                        content: chunk.array[0][1],
                        time: chunk.array[0][2],
                        chatId: chunk.array[0][3],
                        senderId: chunk.array[0][4]
                    }))
            })
            stream.on('end', () => {
                thunkAPI.abort("end")
            })
            stream.on('error', (err) => {
                thunkAPI.abort(err.message)
            })
            return thunkAPI.fulfillWithValue()
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const listMessagesGrpcCall = createAsyncThunk(
    'messages/listMessagesGrpcCall',
    async function({chatId, count, timeFrom}, thunkAPI) {
        try {
            const req = new ListMessagesRequest()
            req.setChatid(chatId)
            req.setCount(count)
            req.setFromtime(timeFrom)
            const result = await new Promise((resolve, reject) => {
                client.listMessages(req, {"Authorization": "Bearer " + getAccessToken()}, (err, result) => {
                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(result);
                    }
                })
            })
            return thunkAPI.fulfillWithValue(result.array[0].map(message => {
                return {
                    id: message[0],
                    content: message[1],
                    time: message[2],
                    chatId: message[3],
                    senderId: message[4]
                }
            }))
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

function onError(state, action) {
    console.log("Error happened in messages-slice " + action.type + " with reason: " + JSON.stringify(action.payload))
}

function withLog(reducer) {
    return (state, action) => {
        console.log("Messages action: [" + action.type + "] payload: " + JSON.stringify(action.payload))
        return reducer(state, action)
    }
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        users: [],
        chats: [],
        messages: []
    },
    reducers: {
        newMessage(state, action) {
            state.messages.push(action.payload)
        },
        clearMessages(state, action) {
            state.messages = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                listUsersGrpcCall.fulfilled,
                withLog((state, action) => {
                    state.users = action.payload
                })
            )
            .addCase(listUsersGrpcCall.rejected, onError)
            .addCase(
                listChatsGrpcCall.fulfilled,
                withLog((state, action) => {
                    state.chats = action.payload
                })
            )
            .addCase(listChatsGrpcCall.rejected, onError)
            .addCase(
                createNewChatGrpcCall.fulfilled,
                withLog((state, action) => {
                    state.chats.push(action.payload)
                })
            )
            .addCase(createNewChatGrpcCall.rejected, onError)
            .addCase(
                sendMessageGrpcCall.fulfilled,
                withLog((state, action) => {
                    state.messages.push(action.payload)
                })
            )
            .addCase(sendMessageGrpcCall.rejected, onError)
            .addCase(
                listMessagesGrpcCall.fulfilled,
                withLog((state, action) => {
                    state.messages = [...state.messages, ...action.payload]
                })
            )
            .addCase(listMessagesGrpcCall.rejected, onError)
    },
});

export const {newMessage, clearMessages} = messagesSlice.actions;

export default messagesSlice.reducer;
