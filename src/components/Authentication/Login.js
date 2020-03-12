import React, { useEffect, useContext } from "react";
import Box from "@material-ui/core/Box";
import Cookies from "js-cookie";
import Grid from "@material-ui/core/Grid";
import jwt_decode from "jwt-decode";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { UserContext } from "../../userContext";
import Image from '../../img/hero.jpg';

/* global gapi */

export default function Login() {
  let endpoint = "https://api.jot-app.com/";

  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    if (gapi) {
      gapi.signin2.render("g-signin2", {
        scope: "openid profile email https://www.googleapis.com/auth/contacts",
        width: 160,
        height: 50,
        longtitle: false,
        theme: "light",
        onsuccess: onSignIn
      });
    }
  }, []);

  function onSignIn(googleUser) {
    console.log("in onSignIn function");
    // let profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;
    const accessToken = googleUser.getAuthResponse().access_token;

    let data = {
      accessToken: accessToken,
      idTokenString: idToken
    };

    fetch(endpoint, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        let jwt = json.jwt;
        Cookies.set("jwt", jwt);
        let decoded;
        try {
          decoded = jwt_decode(jwt);
          dispatch({
            type: "updateFromJwt",
            loggedIn: true,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.emailAddress,
            userId: decoded.userId,
            jwt: jwt
          });
        } catch (err) {
          console.log("Invalid JWT");
          console.log(err);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
      <Grid container item style={{ height: "100vh", backgroundImage: `url(${Image})` }}>
        <Grid container item alignItems="center" justify="center" style={{ height: "100vh", backgroundColor: "transparent"}}>
          <Grid container item xs={4} alignItems="stretch" justify="center" style={{ height: "300px", width: "600px", opacity: "1" }}>
            <Grid container item alignItems="stretch" item xs={12} >
                <Paper style={{ width: "100%", opacity: '.9'}}>
                  <Grid container item xs={12} style={{ width: "100%", height: "100%" }}>
                    <Grid container item alignItems="center" justify="center" xs={6}>
                      <Grid container item xs={12} alignItems="flex-end" justify="center" style={{ height: "35%" }}>
                        <Typography variant="body1" style={{ fontWeight: "bold" }}>Welcome to</Typography>
                      </Grid>
                      <Grid container item xs={12} alignItems="flex-start" justify="center" style={{ height: "75%" }}>
                        <Typography variant="h1">Jot</Typography>
                      </Grid>
                    </Grid>
                    <Grid container item alignItems="center" justify="center" xs={6} style={{ padding: "20px" }}>
                      <Grid container item justify="center" xs={12} >
                        <Typography align="center" paragraph style={{ fontWeight: "bold" }} >Jot helps you manage your personal and professional relationships with a clean and simple CMS.</Typography>
                        <Typography style={{ fontWeight: "bold", paddingBottom: "0px" }}>Own your data.</Typography>
                      </Grid>
                      <Grid container item justify="center" xs={12}>
                        <Box component="div" id="g-signin2" className="g-signin2"></Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  );
}

// Photo by Green Chameleon on Unsplash