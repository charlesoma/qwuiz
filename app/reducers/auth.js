import {
    FETCH_USER_ACTION_TYPES,
    LOGIN_WITH_EMAIL_ACTION_TYPES,
    SOCIAL_LOGIN_ACTION_TYPES,
    SIGHUP_WITH_EMAIL_ACTION_TYPES
} from '../actions/actionTypes'

const {
    FETCH_USER_FULFILLED, 
    FETCH_USER_REJECTED
} = FETCH_USER_ACTION_TYPES
const {
    LOGIN_WITH_EMAIL_FULFILLED,
    LOGIN_WITH_EMAIL_REJECTED,
    LOGIN_WITH_EMAIL_REQUEST
} = LOGIN_WITH_EMAIL_ACTION_TYPES
const {
    SOCIAL_LOGIN_FULFILLED,
    SOCIAL_LOGIN_REQUEST,
    SOCIAL_LOGIN_REJECTED
  } = SOCIAL_LOGIN_ACTION_TYPES;
const {
    SIGNUP_WITH_EMAIL_REQUEST,
    SIGNUP_WITH_EMAIL_FULFILLED,
    SIGNUP_WITH_EMAIL_REJECTED
} = SIGHUP_WITH_EMAIL_ACTION_TYPES
const initialState = {
    isAuthenticated: false,
    isRegistered: false,
    loading: false,
    user: null
}

const authReducer = (state=initialState, action) => {
  switch (action.type) {

    case SIGNUP_WITH_EMAIL_REQUEST:
        return {
            ...state,
            loading: true
        }

    case SIGNUP_WITH_EMAIL_FULFILLED:
        return { 
            ...state,
            loading: false,
            isAuthenticated: true
        }

    case SIGNUP_WITH_EMAIL_REJECTED:
        return {
            ...state,
            loading: false,
            isAuthenticated: false
        }

    case LOGIN_WITH_EMAIL_REQUEST:
        return {
            ...state,
            loading: true
        }

    case LOGIN_WITH_EMAIL_FULFILLED:
        return {
            ...state,
            loading: false,
            isAuthenticated: true
        }

    case LOGIN_WITH_EMAIL_REJECTED:
        return {
            ...state,
            loading: false,
            isAuthenticated: false
        }

        case SOCIAL_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
    
        case SOCIAL_LOGIN_FULFILLED:
            return {
                ...state,
                loading: false,
                isAuthenticated: true
            }
    
        case SOCIAL_LOGIN_REJECTED:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            }

    case FETCH_USER_FULFILLED:
        return {
            ...state,
            user: action.payload
        }

    case FETCH_USER_REJECTED:
        return {
            ...state,
            user: null
        }

    default:
      return state;
  }
};

export default authReducer;