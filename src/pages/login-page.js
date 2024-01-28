import {connect} from "react-redux";
import {performAuthorization} from "../store/actions/auth-actions";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";

const LoginPage = (props) => {
    return <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Авторизация
                    </Typography>
                    <Typography variant="h8">
                        Чтобы воспользоваться сервисом, пожалуйста, авторизируйтесь через вашу студенческую почту.
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
)(LoginPage);