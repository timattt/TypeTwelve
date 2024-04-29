import {Box, Card, CardContent, Typography} from "@mui/material";
import {connect} from "react-redux";

const HiddenPage = (props) => {
    return <Box display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center">
        <br/>
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Что-то полезное
                </Typography>
            </CardContent>
        </Card>
    </Box>
}

export default connect(
    (state) => {
        return {
        }
    },
    (dispatch) => {
        return {}
    }
)(HiddenPage);