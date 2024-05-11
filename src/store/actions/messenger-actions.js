import {MessengerClient} from "../../proto/messenger_grpc_web_pb";
import {GrpcMessage, SendMessageRequest, GetMessageAfterRequest} from "../../proto/messenger_pb";
import {MessengerActionTypes, TYPE11_URL} from "../constants";
import {getSelfEmail} from "../token-manager";

const client = new MessengerClient(TYPE11_URL, null, null);

export function sendMessage(toEmail, content) {
    console.log("Action: [sendMessage]")
    return async dispatch => {
        const fromEmail = getSelfEmail()
        const req = new SendMessageRequest()
        const mes = new GrpcMessage()
        mes.setSenderemail(fromEmail)
        mes.setReceiveremail(toEmail)
        mes.setContent(content)
        req.setMessage(mes)
        return new Promise((resolve, reject) => {
            client.sendMessage(req, {}, (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(result);
                }
            })
        }).then(result => {
            dispatch({
                type: MessengerActionTypes.sendMessage,
                payload: {fromEmail: fromEmail, toEmail: toEmail, content: content, time: (new Date()).getTime()}
            })
        }).catch((err) => {
            console.log("Call to sendMessage failed with error: " + err)
        })
    }
}

export function getMessagesAfter(time) {
    console.log("Action: [getMessagesAfter]")
    return async dispatch => {
        const fromEmail = getSelfEmail()
        const req = new GetMessageAfterRequest()
        req.setUseremail(fromEmail)
        req.setTime(time)
        return new Promise((resolve, reject) => {
            client.getMessagesAfter(req, {}, (err, result) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(result);
                }
            })
        }).then(result => {
            dispatch({
                type: MessengerActionTypes.getAfter,
                payload: result.getMessagesList().map((message) => {
                    return {
                        id: message.array[0],
                        fromEmail: message.array[1],
                        toEmail: message.array[2],
                        content: message.array[3],
                        time: message.array[4]
                    }
                })
            })
        }).catch(err => {
            console.log("Call to getMessagesAfter failed with error: " + err)
        })
    }
}

