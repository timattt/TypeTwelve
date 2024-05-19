import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {exchangeCodeToToken} from "../store/slices/auth-slice";

export default (props) => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const code = searchParams.get("code")
    const authorized = useSelector((state) => state.auth.authorized);
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