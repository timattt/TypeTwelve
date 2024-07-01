import {Box, Button, Card, CardContent, MenuItem, Select, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {getSelfId} from "../store/token-manager";
import {useNavigate} from "react-router-dom";
import {createNewChatGrpcCall} from "../store/slices/messenger-slice";
import {toStringUser} from "../utils";

const ChatPanel = (props) => {
    const {users, chat} = props
    const navigate = useNavigate()

    let text = ""

    chat.users.map(userId => {
        return users.find(user => user.id === userId)
    }).forEach(user => {
        if (user === undefined) {
            text += "???, "
        } else {
            text += user.firstName + " " + user.lastName + ", "
        }
    })

    text = text.substring(0, text.length - 2)

    return <div key={chat.id}>
        <Button key={chat.id} onClick={() => {
            navigate("/chat/" + chat.id)
        }}>
            Chat with {text}
        </Button>
        <br/>
    </div>
}

export default () => {
    const dispatch = useDispatch();
    const chats = useSelector((state) => state.messages.chats);
    const users = useSelector((state) => state.messages.users);

    const [selectedUser, setSelectedUser] = useState(null);

    return <Box>
        <br/>
        <Card key="creator" className="creator">
            <CardContent>
                <Typography variant="h4">
                    Создание диалога
                </Typography>
                <br/>
                <Typography variant="h6">
                    Выберите пользователя для начала диалога с ним
                </Typography>
                <br/>
                <Select labelId="user-selector" id="user-select" value={selectedUser == null ? "" : selectedUser.id} onChange={(event) => {
                    setSelectedUser(users.find(user => user.id === event.target.value))
                }}>
                    {
                        users.filter(user => user.id !== getSelfId()).map(user => <MenuItem key={user.id} value={user.id}>{toStringUser(user)}</MenuItem>)
                    }
                </Select>
                <br/>
                <br/>
                <Button disabled={selectedUser === null} onClick={(event) => {
                    dispatch(createNewChatGrpcCall(selectedUser.id))
                }}>Начать диалог</Button>
            </CardContent>
        </Card>
        <br/>
        <Card key="chats" className="chats">
            <CardContent>
                <Typography variant="h4">
                    Список диалогов
                </Typography>

                <br/>

                {
                    chats.map((chat) => <ChatPanel key={chat.id} chat={chat} users={users}/>)
                }

            </CardContent>
        </Card>
        <br/>
    </Box>
}