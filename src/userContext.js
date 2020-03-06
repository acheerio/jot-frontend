import React from 'react';

const UserContext = React.createContext({
    loggedIn: false,
    firstName: "",
    lastName: "",
    email: "",
    userId: -1,
    picUrl: "",
    jwt: ""
});

export { UserContext };