import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {performAuthorization} from "../store/slices/auth-slice";

export default () => {
    const dispatch = useDispatch();
    return <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Вы не аутентифицированы
                    </Typography>
                    <Typography variant="h8">
                        Пожалуйста, пройдите аутентификацию
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => dispatch(performAuthorization())}>Войти</Button>
                </CardActions>
            </Card>
    </Box>
}