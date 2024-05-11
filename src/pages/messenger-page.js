import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getMessagesAfter, sendMessage} from "../store/actions/messenger-actions";
import {useEffect, useState} from "react";

export default () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messengerReducer.messages);
    const [text, setText] = useState("")
    const [receiver, setReceiver] = useState("");

    useEffect(() => {
        dispatch(getMessagesAfter(0))
    }, [])

    return <Box display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center">
        <br/>
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
                <Typography variant="h6">
                    Receiver:
                </Typography>
                <br/>
                <TextField value={receiver} onChange={(event) => {setReceiver(event.target.value)}}/>
                <br/>
                <br/>
                <Button onClick={() => {
                    dispatch(sendMessage(receiver, text))
                }}>Send</Button>
            </CardContent>
        </Card>
        <br/>
        {
            messages.sort((a, b) => a.time > b.time ? 1 : -1).map((message, index) =>
                <div id={index} key={index}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                from: {message.fromEmail}
                            </Typography>
                            <br/>
                            <Typography variant="h5">
                                to: {message.toEmail}
                            </Typography>
                            <br/>
                            <Typography variant="h6">
                                {message.content}
                            </Typography>
                        </CardContent>
                    </Card>
                    <br/>
                </div>
            )
        }
    </Box>
}