import axios from 'axios'
import { AsyncStorage } from 'react-native'

import {
  GET_PROFILE_ACTION_TYPES,
  GET_WALLET_BALANCE_ACTION_TYPES,
  WALLET_TOPUP_ACTION_TYPES,
  GET_COUNTRIES_ACTION_TYPES,
  PROFILE_UPDATE_ACTION_TYPES,
  GAMES_PLAYED_ACTION_TYPES
} from "./actionTypes";

const {
  GET_PROFILE_REQUEST,
  GET_PROFILE_FULFILLED,
  GET_PROFILE_REJECTED
} = GET_PROFILE_ACTION_TYPES
const {
  GET_WALLET_BALANCE_REQUEST,
  GET_WALLET_BALANCE_FULFILLED,
  GET_WALLET_BALANCE_REJECTED
} = GET_WALLET_BALANCE_ACTION_TYPES
const {
  WALLET_TOPUP_REQUEST,
  WALLET_TOPUP_FULFILLED,
  WALLET_TOPUP_REJECTED
} = WALLET_TOPUP_ACTION_TYPES
const {
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_FULFILLED,
  GET_COUNTRIES_REJECTED
} = GET_COUNTRIES_ACTION_TYPES
const {
  GAMES_PLAYED_REQUEST,
  GAMES_PLAYED_FULFILLED,
  GAMES_PLAYED_REJECTED
} = GAMES_PLAYED_ACTION_TYPES
const {
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_FULFILLED,
  PROFILE_UPDATE_REJECTED
} = PROFILE_UPDATE_ACTION_TYPES
const BASE_URL = "https://immense-badlands-40083.herokuapp.com";

// THUNKS
const profile = () => {
  return async (dispatch, getState) => {
    dispatch(fetchProfileRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const profile = response.data.data;
      console.log("profile ==> ", profile);
      dispatch(fetchProfileFulfilled(profile));
    } catch (e) {
      console.log(e);
      dispatch(fetchProfileRejected());
    }
  };
};

const profileUpdate = (data) => {
  console.log(data)
  return async (dispatch, getState) => {
    dispatch(profileUpdateRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/profile`,
        data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const profile = response;
      console.log("profile ==>", profile)
      // await dispatch(profile());
      return dispatch(profileUpdateFulfilled());
    } catch (e) {
      console.log(e);
      dispatch(profileUpdateRejected());
    }
  };
};

const countries = () => {
  return async (dispatch, getState) => {
    dispatch(fetchCountriesRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/profile/countries`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }); 
      const countries = response.data.countries;
      console.log("countries ==> ", countries);
      dispatch(fetchCountriesFulfilled(countries));
    } catch (e) {
      console.log(e);
      dispatch(fetchCountriesRejected());
    }
  };
};

const walletBalance = () => {
  return async (dispatch, getState) => {
    dispatch(fetchWalletBalanceRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/wallet`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }); 
      const wallet = response.data;
      console.log("wallet ==> ", wallet);
      dispatch(fetchWalletBalanceFulfilled(wallet));
    } catch (e) {
      console.log(e);
      dispatch(fetchWalletBalanceRejected());
    }
  };
};

const walletTopup = (data) => {
  return async (dispatch, getState) => {
    dispatch(walletTopupRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/wallet/top-up`,
        data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const newWallet = response.data;
      console.log("newWallet ==>", newWallet)
      return dispatch(walletTopupFulfilled(newWallet));
    } catch (e) {
      console.log(e);
      dispatch(walletTopupRejected());
    }
  };
};

const getPractice = () => {
  return async (dispatch, getState) => {
    dispatch(fetchPracticeRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/profile/practice`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const practice = response;
      console.log("practice ==> ", practice);
      dispatch(fetchPracticeFulfilled(practice));
    } catch (e) {
      console.log(e);
      dispatch(fetchPracticeRejected());
    }
  };
}; 

const manageGames = () => {
  return async (dispatch, getState) => {
    dispatch(manageGamesRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/profile/manage-games`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const manageGames = response;
      console.log("manageGames ==> ", manageGames);
      dispatch(manageGamesFulfilled(manageGames));
    } catch (e) {
      console.log(e);
      dispatch(manageGamesRejected());
    }
  };
};

const gamesPlayed = () => {
  return async (dispatch, getState) => {
    dispatch(gamesPlayedRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/profile/games-played`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const games = response.data;
      console.log("gamesPlayed ==> ", games);
      dispatch(gamesPlayedFulfilled(games));
    } catch (e) {
      console.log(e);
      dispatch(gamesPlayedRejected());
    }
  };
};

// ACTION CREATORS

const fetchProfileRequest = () => ({
  type: GET_PROFILE_REQUEST
});

const fetchProfileFulfilled = profile => ({
  type: GET_PROFILE_FULFILLED,
  payload: profile
});

const fetchProfileRejected = () => ({
  type: GET_PROFILE_REJECTED
});

const fetchWalletBalanceRequest = () => ({
  type: GET_WALLET_BALANCE_REQUEST
});

const fetchWalletBalanceFulfilled = wallet => ({
  type: GET_WALLET_BALANCE_FULFILLED,
  payload: wallet
});

const fetchWalletBalanceRejected = () => ({
  type: GET_WALLET_BALANCE_REJECTED
});

const walletTopupRequest = () => ({
  type: WALLET_TOPUP_REQUEST
});

const walletTopupFulfilled = (newWallet) => ({
  type: WALLET_TOPUP_FULFILLED,
  payload: newWallet
});

const walletTopupRejected = () => ({
  type: WALLET_TOPUP_REJECTED
});

const fetchCountriesRequest = () => ({
  type: GET_COUNTRIES_REQUEST
});

const fetchCountriesFulfilled = (countries) => ({
  type: GET_COUNTRIES_FULFILLED,
  payload: countries
});

const fetchCountriesRejected = () => ({
  type: GET_COUNTRIES_REJECTED
});

const profileUpdateRequest = () => ({
  type: PROFILE_UPDATE_REQUEST
});

const profileUpdateFulfilled = () => ({
  type: PROFILE_UPDATE_FULFILLED
});

const profileUpdateRejected = () => ({
  type: PROFILE_UPDATE_REJECTED
});

const gamesPlayedRequest = () => ({
  type: GAMES_PLAYED_REQUEST
});

const gamesPlayedFulfilled = (games) => ({
  type: GAMES_PLAYED_FULFILLED,
  payload: games
});

const gamesPlayedRejected = () => ({
  type: GAMES_PLAYED_REJECTED
});


export { profile, walletBalance, walletTopup, countries, profileUpdate, gamesPlayed }