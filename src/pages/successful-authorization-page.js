import {connect} from "react-redux";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {getAccessToken, getRefreshToken, hasTokens} from "../store/token-manager";

const SuccessfulAuthorizationPage = (props) => {
    return <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Добро пожаловать!
                    </Typography>
                    <Typography variant="h8">
                        Вы успешно авторизировались!
                    </Typography>
                    <Typography variant="h8">
                        {hasTokens() ? <div>
                            <br/>
                            <br/>
                            Access:
                            <br/>
                            <br/>
                            {getAccessToken()}
                            <br/>
                            <br/>
                            Refresh:
                            <br/>
                            <br/>
                            {getRefreshToken()}
                        </div> : <div>Токенов нет!</div>}
                    </Typography>
                </CardContent>
            </Card>
    </Box>
}

export default connect(
    (state) => {
        return {}
    },
    (dispatch) => {
        return {}
    }
)(SuccessfulAuthorizationPage);