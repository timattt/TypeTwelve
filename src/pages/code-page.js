import {connect} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {exchangeCodeToToken} from "../store/actions/auth-actions";
import {useEffect} from "react";

const CodePage = (props) => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const code = searchParams.get("code")

    useEffect(() => {
        if (props.authorized) {
            navigate("/authorized")
        } else {
            props.exchangeCodeToToken(code)
        }
    }, [code, navigate, props, props.authorized])

    return <div></div>
}

export default connect(
    (state) => {
        return {
            authorized: state.authReducer.authorized
        }
    },
    (dispatch) => {
        return {exchangeCodeToToken: (code) => dispatch(exchangeCodeToToken(code))}
    }
)(CodePage);