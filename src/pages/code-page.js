import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {exchangeCodeToToken} from "../store/actions/auth-actions";
import {useEffect} from "react";

export default (props) => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const code = searchParams.get("code")
    const authorized = useSelector((state) => state.authReducer.authorized);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authorized) {
            navigate("/authorized")
        } else {
            dispatch(exchangeCodeToToken(code))
        }
    }, [code, navigate, props, authorized])

    return <div></div>
}