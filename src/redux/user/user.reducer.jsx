import UserActionTypes from './user.types';

// what you'd set for this.state in constructor in react
const INITIAL_STATE = {
    currentUser: null,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state, 
                currentUser: action.payload
            };
        case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
        case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
            return {
                ...state, 
                currentUser: action.payload,
                error: null
            };
        case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
        case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
            return {
                ...state, 
                error: action.payload
            };
        default:
            return state;
    };
}

export default userReducer;