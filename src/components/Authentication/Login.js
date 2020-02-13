import React from "react";
// import useScript from '../../util/useScript.js';
import GoogleLogin from 'react-google-login';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    }
}));

export default function Login() {
    const classes = useStyles();
    // useScript('https://apis.google.com/js/platform.js', false, true);
    let clientId = '924098505527-ta2u3pvgjksj497p9lu7rcahkvfoq1vs.apps.googleusercontent.com';
    const responseGoogle = (response) => {
        console.log(response);
    };

    return (

        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                {/* Action Area */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Register or Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
