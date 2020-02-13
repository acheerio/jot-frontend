import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Authentication/Login";
import {SwipeableDrawer} from "@material-ui/core";

function App() {
  const [loggedInStatus, setLoggedIn] = useState(false);

  return (
    <div>
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path={"/"}
                    render={props => (
                        <Login
                            {...props}
                            loggedInStatus={loggedInStatus}
                        />
                    )}
                />
                <Route
                    exact
                    path={"/dashboard"}
                    render={props => (
                        <Dashboard
                            {...props}
                            loggedInStatus={loggedInStatus}
                        />
                    )}
                />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
