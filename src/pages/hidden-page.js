import {Box, Card, CardContent, Typography} from "@mui/material";

export default () => {
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