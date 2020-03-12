import React, { useReducer } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Authentication/Login";
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
          if (decoded.exp <= new Date().getTime()) {
              Cookies.remove('jwt');
          }
          else {
              dispatch({
                  type: 'updateFromJwt',
                  loggedIn: true,
                  firstName: decoded.firstName,
                  lastName: decoded.lastName,
                  email: decoded.emailAddress,
                  userId: decoded.userId,
                  jwt: jwt
              });
          }
      } catch (err) {
        console.log("Unable to login");
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
