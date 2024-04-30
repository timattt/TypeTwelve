import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {performAuthorization} from "../store/actions/auth-actions";

export default () => {
    const dispatch = useDispatch();
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
                    <Button size="small" onClick={() => dispatch(performAuthorization())}>Войти</Button>
                </CardActions>
            </Card>
    </Box>
}