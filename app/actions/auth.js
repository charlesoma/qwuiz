import axios from 'axios'
import { AsyncStorage } from 'react-native'

import {
  LOGIN_WITH_EMAIL_ACTION_TYPES,
  SOCIAL_LOGIN_ACTION_TYPES,
  SIGHUP_WITH_EMAIL_ACTION_TYPES,
  FETCH_USER_ACTION_TYPES
} from "./actionTypes";

const {
  LOGIN_WITH_EMAIL_FULFILLED,
  LOGIN_WITH_EMAIL_REQUEST,
  LOGIN_WITH_EMAIL_REJECTED
} = LOGIN_WITH_EMAIL_ACTION_TYPES;
const {
  SOCIAL_LOGIN_FULFILLED,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_REJECTED
} = SOCIAL_LOGIN_ACTION_TYPES;
const {
  SIGNUP_WITH_EMAIL_REQUEST,
  SIGNUP_WITH_EMAIL_FULFILLED,
  SIGNUP_WITH_EMAIL_REJECTED
} = SIGHUP_WITH_EMAIL_ACTION_TYPES;
const {
  FETCH_USER_FULFILLED,
  FETCH_USER_REQUEST,
  FETCH_USER_REJECTED
} = FETCH_USER_ACTION_TYPES;
const BASE_URL = "https://immense-badlands-40083.herokuapp.com";

// THUNKS
const fetchUser = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUserRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { user } = response.data;
      console.log("user is ==> ", user);
      dispatch(fetchUserFulfilled(user));
    } catch (e) {
      console.log(e);
      dispatch(fetchUserRejected()); 
    }
  };
};

const loginWithEmail = data => {
  return async (dispatch, getState) => {
    dispatch(loginWithEmailRequest());
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        data
      );
      const { token } = response.data;
      console.log(token);
      // save token to async storage
      await AsyncStorage.setItem("token", token);
      // fetch user data
      await dispatch(fetchUser());
      return dispatch(loginWithEmailFulfilled());
    } catch (e) {
      console.log(e);
      dispatch(loginWithEmailRejected());
    }
  };
};

const socialLogin = data => {
  console.log(data)
  return async (dispatch, getState) => {
    dispatch(socialLoginRequest());
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login/social`,
        data
      );
      const { token } = response.data;
      console.log(token);
      // save token to async storage
      await AsyncStorage.setItem("token", token);
      // fetch user data
      await dispatch(fetchUser());
      return dispatch(socialLoginFulfilled());
    } catch (e) {
      console.log(e);
      dispatch(socialLoginRejected());
    }
  };
};

const register = data => {
  return async (dispatch, getState) => {
    dispatch(signupWithEmailRequest());
    try {
      await axios.post(
        `${BASE_URL}/api/auth/register`,
        data
      );
      // fetch user data
      await dispatch(fetchUser());
      return dispatch(signupWithEmailFulfilled());
    } catch (e) {
      console.log(e);
      dispatch(signupWithEmailRejected());
    }
  };
};

// ACTION CREATORS

const signupWithEmailRequest = data => ({
  type: SIGNUP_WITH_EMAIL_REQUEST,
  payload: data
});

const signupWithEmailFulfilled = () => ({
  type: SIGNUP_WITH_EMAIL_FULFILLED
});

const signupWithEmailRejected = () => ({
  type: SIGNUP_WITH_EMAIL_REJECTED
});

const loginWithEmailRequest = data => ({
  type: LOGIN_WITH_EMAIL_REQUEST,
  payload: data
});

const loginWithEmailFulfilled = () => ({
  type: LOGIN_WITH_EMAIL_FULFILLED
});

const loginWithEmailRejected = () => ({
  type: LOGIN_WITH_EMAIL_REJECTED
});

const socialLoginRequest = data => ({
  type: SOCIAL_LOGIN_REQUEST,
  payload: data
});

const socialLoginFulfilled = () => ({
  type: SOCIAL_LOGIN_FULFILLED
});

const socialLoginRejected = () => ({
  type: SOCIAL_LOGIN_REJECTED
});

const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST
});

const fetchUserFulfilled = user => ({
  type: FETCH_USER_FULFILLED,
  payload: user
});

const fetchUserRejected = () => ({
  type: FETCH_USER_REJECTED
});


export { fetchUser, loginWithEmail, socialLogin, register }