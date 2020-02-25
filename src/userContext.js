import React from 'react';

const UserContext = React.createContext({
    firstName: "",
    lastName: "",
    email: "",
    userId: -1,
    picUrl: "",
});

export { UserContext };