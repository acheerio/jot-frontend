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
        display: "flex"
    },
    paper: {
        padding: theme.spacing(4),
        overflow: "auto",
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    typography: {
        textAlign: "center"
    }
}));

export default function Login() {
    const classes = useStyles();
    useScript('https://apis.google.com/js/platform.js', false, true);
    let clientId = '924098505527-ta2u3pvgjksj497p9lu7rcahkvfoq1vs.apps.googleusercontent.com';
    const responseGoogle = (response) => {
        console.log(response);
    };
    function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
    }

    return (
        <Container maxWidth="lg">
            <meta name="google-signin-scope" content="profile email https://www.googleapis.com/auth/contacts"></meta>
            <meta name="google-signin-client_id" content={clientId}></meta>
            <Grid className={classes.container} container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h2" component="h2" className={classes.typography}>Sign up for Jot today!</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                    <Box component="div" className="g-signin2" onClick={onSignIn}></Box>
                </Grid>
                <Grid item xs={5}></Grid>
            </Grid>
        </Container>
    );
}
