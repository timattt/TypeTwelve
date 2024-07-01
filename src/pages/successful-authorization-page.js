import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default () => {
    const navigate = useNavigate();

    return <Box>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Добро пожаловать!
                    </Typography>
                    <Typography variant="h8">
                        Вы успешно авторизировались!
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => navigate("/messenger")}>Перейти в мессенджер</Button>
                </CardActions>
            </Card>
    </Box>
}