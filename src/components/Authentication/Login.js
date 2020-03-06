import React, { useState, useEffect, useContext } from "react";
import useScript from '../../util/useScript.js';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { UserContext } from '../../userContext';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";

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
    // const {dispatch} = useContext(UserContext);

    const value = useContext(UserContext);
    const { dispatch } = useContext(UserContext);
    console.log("in Login function / component");
    console.log("logged in status from context");
    console.log(value.user.loggedIn);

    useEffect(() => {
        if (gapi) {
        gapi.signin2.render('g-signin2', {
            'scope': 'openid profile email https://www.googleapis.com/auth/contacts',
            'width': 200,
            'height': 50,
            'longtitle': false,
            'theme': 'light',
            'onsuccess': onSignIn
        })}
    }, []);

    function onSignIn(googleUser) {
        console.log("in onSignIn function");
        // let profile = googleUser.getBasicProfile();
        const idToken = googleUser.getAuthResponse().id_token;
        const accessToken = googleUser.getAuthResponse().access_token;

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
            let jwt = json.jwt;
            Cookies.set('jwt', jwt);
            let decoded;
            try {
                decoded = jwt_decode(jwt);
                dispatch({
                    type: 'updateFromJwt',
                    loggedIn: true,
                    firstName: decoded.firstName,
                    lastName: decoded.lastName,
                    email: decoded.emailAddress,
                    userId: decoded.userId,
                    jwt: jwt });
            } catch (err) {
                console.log("Invalid JWT");
                console.log(err);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <Container maxWidth="lg">
            <Grid className={classes.container} container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h2" component="h2" className={classes.typography}>Sign up for Jot
                            today!</Typography>
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
                            {(value) => (<Typography variant="body1" component="div">
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

