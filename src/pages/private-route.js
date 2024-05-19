import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {introspectToken} from "../store/slices/auth-slice";
import {exchangeGrpcCall, listChatsGrpcCall, listUsersGrpcCall} from "../store/slices/messenger-slice";

export default () => {
    const authorized = useSelector((state) => state.auth.authorized);
    const dispatch = useDispatch();
    const location = useLocation()

    // каждый раз, когда пользователь переключает страничку - проверяем токен
    // Если пользователь только авторизировался - скачиваем данные
    useEffect(() => {
        if (authorized) {
            dispatch(introspectToken())
        }
    }, [location, authorized])
    useEffect(() => {
        dispatch(listUsersGrpcCall())
        dispatch(listChatsGrpcCall())
        dispatch(exchangeGrpcCall())
    }, [])
    return (authorized ? <Outlet/> : <Navigate to="/unauthorized"/>)
}