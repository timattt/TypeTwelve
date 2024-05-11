import {useDispatch} from "react-redux";
import {performAuthorization} from "../store/actions/auth-actions";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";

export default () => {
    const dispatch = useDispatch();
    return <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Авторизация
                    </Typography>
                    <Typography variant="h8">
                        Чтобы воспользоваться сервисом, пожалуйста, авторизируйтесь через вашу почту.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => dispatch(performAuthorization())}>Войти</Button>
                </CardActions>
            </Card>
    </Box>
}