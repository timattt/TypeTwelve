import {Navigate, Outlet, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {useEffect} from "react";
import {loadAll} from "../store/actions/user-info-actions";

const PrivateRoutes = (props) => {
    // каждый раз, когда пользователь переключает страничку - проверяем токен
    const location = useLocation()
    useEffect(() => {
        props.loadAll()
    }, [location])

    // Если пользователь только авторизировался - скачиваем данные
    useEffect(() => {
        if (props.authorized && props.userInfo === undefined) {
            props.loadAll()
        }
    })
    return (props.authorized ? <Outlet/> : <Navigate to="/unauthorized"/>)
}

export default connect(
    (state) => {
        return {
            authorized: state.authReducer.authorized,
            userInfo: state.userInfoReducer.userInfo
        }
    },
(dispatch) => {
    return {loadAll: () => dispatch(loadAll())}
    }
)(PrivateRoutes);