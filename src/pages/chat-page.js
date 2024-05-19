import {Box, Button, Card, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {sendMessageGrpcCall} from "../store/slices/messenger-slice";

const makeUserString = (users, message) => {
    const user = users.find((user) => message.senderId === user.id)
    if (user === undefined) {
        return ""
    }
    return user.firstName + " " + user.lastName
}

export default () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const chats = useSelector((state) => state.messages.chats);
    const users = useSelector((state) => state.messages.users);
    const [text, setText] = useState("")

    if (chats === undefined || users === undefined) {
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

    const chat = chats.find((chat) => chat.id == id);

    if (chat === undefined) {
        return <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        {chats.length === 0 ? "" : "No such chat!"}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    }

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
                    dispatch(sendMessageGrpcCall({chatId: chat.id, content: text}))
                }}>Send</Button>
            </CardContent>
        </Card>
        <br/>
        <Card>
            <CardContent>
                {[...chat.messages].sort((a, b) => -a.time + b.time).map((message, index) => {
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
            </CardContent>
        </Card>
    </Box>
}