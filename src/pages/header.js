import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {performLogout} from "../store/slices/auth-slice";

export default () => {
    const authorized = useSelector((state) => state.auth.authorized);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Сюда можно добавлять страницы в хедер
    return <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => navigate("/")}>Type-12</Button>
                    {authorized ? <Button color="inherit" onClick={() => navigate("/messenger")}>Messenger</Button> : <div/>}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
                    { !authorized
                        ? <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                        : <Button color="inherit" onClick={() => dispatch(performLogout())}>Logout</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
        <Outlet/>
    </div>
}