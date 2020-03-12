
export const initialState = {
    loggedIn: false,
    firstName: "",
    lastName: "",
    email: "",
    userId: -1,
    picUrl: "",
    jwt: ""
};

export function init(value) {
    return initialState;
};

export function userReducer(state, action) {
    switch (action.type) {
        case 'updateFromJwt':
            return {
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                userId: action.userId,
                jwt: action.jwt,
                loggedIn: action.loggedIn,
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