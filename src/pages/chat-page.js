import {Box, Button, Card, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {listMessagesGrpcCall, sendMessageGrpcCall, clearMessages} from "../store/slices/messenger-slice";

const makeUserString = (users, message) => {
    const user = users.find((user) => message.senderId === user.id)
    if (user === undefined) {
        return ""
    }
    return user.firstName + " " + user.lastName
}

const PAGE_SIZE = 2;

export default () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const allMessages = useSelector((state) => state.messages.messages);
    const users = useSelector((state) => state.messages.users);
    const [text, setText] = useState("")

    useEffect(() => {
        dispatch(clearMessages({}))
        dispatch(listMessagesGrpcCall({chatId: id, timeFrom: Date.now(), count: PAGE_SIZE}));
    }, [dispatch, id])

    if (allMessages === undefined || users === undefined) {
        return <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Loading...
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    }

    const messages = allMessages.filter(message => message.chatId === Number(id)).sort((a, b) => -a.time + b.time)

    return <Box>
        <Card>
            <CardContent>
                <Typography variant="h5">
                    New Message:
                </Typography>
                <br/>
                <Typography variant="h6">
                    Text:
                </Typography>
                <br/>
                <TextField value={text} onChange={(event) => {setText(event.target.value)}}/>
                <br/>
                <br/>
                <Button onClick={(event) => {
                    dispatch(sendMessageGrpcCall({chatId: id, content: text}))
                }}>Send</Button>
            </CardContent>
        </Card>
        <br/>
        <Card>
            <CardContent>
                {messages.map((message, index) => {
                    return <div key={index}>
                        <Typography variant="h8">
                            {(new Date(message.time)).toUTCString()}
                        </Typography>
                        <Typography variant="h6">
                            by {makeUserString(users, message)}
                        </Typography>
                        <Typography variant="h6">
                            {message.content}
                        </Typography>
                        <br/>
                    </div>
                })}
                <br/>
                <Button onClick={() => {
                    dispatch(listMessagesGrpcCall({chatId: id, timeFrom: messages[messages.length - 1].time, count: PAGE_SIZE}));
                }}>More</Button>
            </CardContent>
        </Card>
    </Box>
}