import React, { useState, useEffect } from "react";
import useScript from '../../util/useScript.js';
import GoogleLogin from 'react-google-login';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

/* global gapi */

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

    useEffect(() => {

        gapi.signin2.render('g-signin2', {
            'scope': 'profile email https://www.googleapis.com/auth/contacts',
            'width': 200,
            'height': 50,
            'longtitle': false,
            'theme': 'light',
            'onsuccess': onSignIn
        })
    }, [])

    function onSignIn(googleUser) {
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    return (
        <Container maxWidth="lg">
            <Grid className={classes.container} container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h2" component="h2" className={classes.typography}>Sign up for Jot today!</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                    <Box component="div" id="g-signin2" className="g-signin2"></Box>
                </Grid>
                <Grid item xs={5}></Grid>
            </Grid>
        </Container>
    );
}
