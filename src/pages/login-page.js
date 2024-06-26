import {useDispatch} from "react-redux";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {performAuthorization} from "../store/slices/auth-slice";

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