import React, { useState, useReducer } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Authentication/Login";
import {SwipeableDrawer} from "@material-ui/core";
import { UserContext } from './userContext';

function App() {
  const initialState = {
          firstName: "",
          lastName: "",
          email: "",
          userId: -1,
          picUrl: "",
          jwt: ""
      };
  function init(value) {
    return initialState;
  };

    function userReducer(state, action) {
        switch (action.type) {
            case 'updateFromJwt':
                return {
                    firstName: action.firstName,
                    lastName: action.lastName,
                    email: action.email,
                    userId: action.userId,
                    jwt: action.jwt,
                }
            case 'updateFirstName':
                return {
                    firstName: action.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    userId: state.userId,
                    picUrl: state.picUrl,
                };
            case 'updateLastName':
                return {
                    firstName: state.firstName,
                    lastName: action.lastName,
                    email: state.email,
                    userId: state.userId,
                    picUrl: state.picUrl,
                };
            case 'updateEmail':
                return {
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: action.email,
                    userId: state.userId,
                    picUrl: state.picUrl,
                };
            case 'updateUserId':
                return {
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    userId: action.userId,
                    picUrl: state.picUrl,
                };
            case 'updatePicUrl':
                return {
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    userId: state.userId,
                    picUrl: action.picUrl,
                };
            case 'reset':
                return initialState;
            default:
                throw new Error("Not a valid case for reducer");
        }
    }

  const [loggedInStatus, setLoggedIn] = useState(false);
  const [user, dispatch] = useReducer(userReducer, initialState, init);

  return (
    <div>
        <UserContext.Provider value={{user, dispatch}}>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path={"/login"}
                        render={props => (
                            <Login
                                {...props}
                                loggedInStatus={loggedInStatus}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={"/"}
                        render={props => (
                            <Dashboard
                                {...props}
                                loggedInStatus={loggedInStatus}
                            />
                        )}
                    />
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    </div>
  );
}

export default App;
