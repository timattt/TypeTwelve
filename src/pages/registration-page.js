import {useNavigate} from "react-router-dom";
import {Box, Button, Card, CardActions, CardContent, MenuItem, Select, Typography} from "@mui/material";
import {connect} from "react-redux";
import {register} from "../store/actions/user-info-actions";
import {useState} from "react";
import {availableGroups} from "../store/constants";

const OkPane = connect(
    (state) => {
        return {
            userInfo: state.userInfoReducer.userInfo,
            student: state.userInfoReducer.student
        }
    },
    (dispatch) => {
        return {register: (group) => dispatch(register(group))}
    }
)((props) => {
    const navigate = useNavigate()

    return <Card>
        <CardContent>
            <Typography variant="h5">
                Вы успешно зарегистированы на курс по Технологиям программирования
            </Typography>
            <Typography variant="h6">
                Группа: {props.student.group}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={() => navigate(("/course"))}>Полезная информация по курсу</Button>
        </CardActions>
    </Card>
});

const RegistrationPane = connect(
    (state) => {
        return {
            userInfo: state.userInfoReducer.userInfo,

        }
    },
    (dispatch) => {
        return {register: (group) => dispatch(register(group))}
    }
)((props) => {
    const [group, setGroup] = useState(availableGroups[0])

    return <Card>
        <CardContent>
            <Typography variant="h6">
                Группа: <Select
                labelId="Group selector"
                id="group-selector"
                value={group}
                label="Age"
                onChange={(event) => setGroup(event.target.value)}>
                {availableGroups.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={() => props.register(group)}>Зарегистрироваться</Button>
        </CardActions>
    </Card>
});

const RegistrationPage = (props) => {

    if (props.userInfo === undefined) {
        return <div></div>
    }

    return <Box>
        <Card>
            <CardContent>
                <Typography variant="h6">
                    ФИО: {props.userInfo.firstName} {props.userInfo.lastName}
                </Typography>
            </CardContent>
        </Card>
        {props.student === null || props.student === undefined ? <RegistrationPane/> : <OkPane/>}
    </Box>
}

export default connect(
    (state) => {
        return {
            userInfo: state.userInfoReducer.userInfo,
            student: state.userInfoReducer.student
        }
    },
    (dispatch) => {
        return {register: (group) => dispatch(register(group))}
    }
)(RegistrationPage);