import {Navigate, Outlet, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {useEffect} from "react";
import {introspectToken} from "../store/actions/auth-actions";

const PrivateRoutes = (props) => {
    // каждый раз, когда пользователь переключает страничку - проверяем токен
    // Если пользователь только авторизировался - скачиваем данные
    const location = useLocation()
    useEffect(() => {
        if (props.authorized) {
            props.introspectToken()
        }
    }, [location, props.authorized])
    return (props.authorized ? <Outlet/> : <Navigate to="/unauthorized"/>)
}

export default connect(
    (state) => {
        return {
            authorized: state.authReducer.authorized
        }
    },
(dispatch) => {
    return {introspectToken: () => dispatch(introspectToken())}
    }
)(PrivateRoutes);