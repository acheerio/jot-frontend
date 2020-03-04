import React, { useState, useEffect, useContext } from "react";
import useScript from '../../util/useScript.js';
import GoogleLogin from 'react-google-login';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { UserContext } from '../../userContext';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import jwt_decode from 'jwt-decode';

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
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    typography: {
        textAlign: "center"
    }
}));

export default function Login() {
    let endpoint = 'http://localhost:5000/login'

    const classes = useStyles();
    const {dispatch} = useContext(UserContext);

    useEffect(() => {
        gapi.signin2.render('g-signin2', {
            'scope': 'openid profile email https://www.googleapis.com/auth/contacts',
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
        const idToken = googleUser.getAuthResponse().id_token;
        const accessToken = googleUser.getAuthResponse().access_token;
        console.log('ID token: ' + idToken);
        console.log('Access token: ' + accessToken);
        console.log(profile.getGivenName());
        console.log(profile.getFamilyName());

        /*
        dispatch({type: 'updateFirstName', firstName: profile.getGivenName()});
        dispatch({type: 'updateLastName', lastName: profile.getFamilyName()});
        dispatch({type: 'updateEmail', email: profile.getEmail()});
        dispatch({type: 'updatePicUrl', picUrl: profile.getImageUrl()});
         */

        let data = {
            accessToken: accessToken,
            idTokenString: idToken
        }

        fetch(endpoint, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            // console.log((json.id).toString());
            let jwt = json.jwt;
            // TODO: Try-Catch block for decoding
            let decoded = jwt_decode(jwt);
            dispatch({type: 'updateFromJwt', firstName: decoded.firstName, lastName: decoded.lastName, email: decoded.emailAddress, userId: decoded.userId, jwt: jwt })})
            // dispatch({type: 'updateUserId', userId: decoded.userId})})
        .catch((error) => {
            console.log(error);
        });
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
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <UserContext.Consumer>
                            {(value)=>(<Typography variant="body1" component="div">
                                <img src={value.user.picUrl}/>
                                <div>First Name: {value.user.firstName}</div>
                                <div>Last Name: {value.user.lastName}</div>
                                <div>Email: {value.user.email}</div>
                                <div>UserId: {value.user.userId}</div>
                                <Link to="/" label="Dashboard">Dashboard</Link>
                            </Typography>)}
                        </UserContext.Consumer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

