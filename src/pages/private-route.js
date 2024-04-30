import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {introspectToken} from "../store/actions/auth-actions";

export default () => {
    const authorized = useSelector((state) => state.authReducer.authorized);
    const dispatch = useDispatch();
    const location = useLocation()

    // каждый раз, когда пользователь переключает страничку - проверяем токен
    // Если пользователь только авторизировался - скачиваем данные
    useEffect(() => {
        if (authorized) {
            dispatch(introspectToken())
        }
    }, [location, authorized])
    return (authorized ? <Outlet/> : <Navigate to="/unauthorized"/>)
}