import React from "react";
import useScript from '../../util/useScript.js';
import GoogleLogin from 'react-google-login';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        alignItems: "center",
        justify: "center",
        textAlign: "center"
    },
    paper: {
        padding: theme.spacing(4),
        overflow: "auto",
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    box: {
        display: "flex",
        alignItems: "center"
    },
    typography: {
        textAlign: "center",
    }
}));

export default function Login() {
    const classes = useStyles();
    useScript('https://apis.google.com/js/platform.js', false, true);
    let clientId = '924098505527-ta2u3pvgjksj497p9lu7rcahkvfoq1vs.apps.googleusercontent.com';
    const responseGoogle = (response) => {
        console.log(response);
    };

    return (
        <Container maxWidth="lg">
            <meta name="google-signin-client_id" content={clientId}></meta>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h2" component="h2" className={classes.typography}>Sign up for Jot today!</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                    <Box component="div" className="g-signin2" data-onsuccess="onSignIn"></Box>
                </Grid>
                <Grid item xs={5}></Grid>
            </Grid>
        </Container>
    );
}
