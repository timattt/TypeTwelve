import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {connect} from "react-redux";
import {performAuthorization} from "../store/actions/auth-actions";

const UnauthorizedPage = (props) => {
    return <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Вы не авторизированны
                    </Typography>
                    <Typography variant="h8">
                        Пожалуйста, войдите в сервис через вашу студенческую почту, чтобы вас можно было идентифицировать.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={props.performAuthorization}>Войти</Button>
                </CardActions>
            </Card>
    </Box>
}

export default connect(
    (state) => {
        return {
            authResult: state.authReducer.authResult
        }
    },
    (dispatch) => {
        return {performAuthorization: () => dispatch(performAuthorization())}
    }
)(UnauthorizedPage);