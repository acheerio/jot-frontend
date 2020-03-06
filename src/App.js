import React, { useState, useReducer } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Authentication/Login";
import {SwipeableDrawer} from "@material-ui/core";
import { UserContext } from './userContext';
import { userReducer, initialState, init } from './util/userReducer'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

function App() {

  const [user, dispatch] = useReducer(userReducer, initialState, init);

  let jwt = Cookies.get('jwt');
  if (!user.loggedIn && jwt) {
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
  }

  return (
    <div>
        <UserContext.Provider value={{user, dispatch}}>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path={"/login"}
                        render={props => (
                            !user.loggedIn ?
                                <Login {...props} /> : <Redirect to="/" />)}
                    />
                    <Route
                        exact
                        path={"/"}
                        render={(props) => (
                            user.loggedIn ? (<Dashboard {...props} />) : (<Redirect to="/login" />)
                        )}
                    />
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    </div>
  );
}

export default App;
