import {Box, Card, CardContent, Typography} from "@mui/material";
import {connect} from "react-redux";

const TestsListPage = (props) => {
    return <Box>
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Всего тестов: {props.tests.length}
                </Typography>
            </CardContent>
        </Card>
    </Box>
}

export default connect(
    (state) => {
        return {
            userInfo: state.userInfoReducer.userInfo,
            student: state.userInfoReducer.student,
            tests: state.userInfoReducer.tests
        }
    },
    (dispatch) => {
        return {}
    }
)(TestsListPage);