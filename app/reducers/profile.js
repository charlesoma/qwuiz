import {
    GET_PROFILE_ACTION_TYPES,
    GET_WALLET_BALANCE_ACTION_TYPES,
    WALLET_TOPUP_ACTION_TYPES,
    GET_COUNTRIES_ACTION_TYPES,
    PROFILE_UPDATE_ACTION_TYPES,
    GAMES_PLAYED_ACTION_TYPES
} from '../actions/actionTypes'

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
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_FULFILLED,
    PROFILE_UPDATE_REJECTED
} = PROFILE_UPDATE_ACTION_TYPES
const {
    GAMES_PLAYED_REQUEST,
    GAMES_PLAYED_FULFILLED,
    GAMES_PLAYED_REJECTED
} = GAMES_PLAYED_ACTION_TYPES
const initialState = {
    loading: false,
    profile: [],
    wallet: [],
    topup: false,
    walletRes: [],
    countries: [],
    updated: false,
    games: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_PROFILE_FULFILLED:
            return {
                ...state,
                loading: false,
                profile: action.payload
            }

        case GET_PROFILE_REJECTED:
            return {
                ...state,
                loading: false,
                profile: []
            }

        case GET_WALLET_BALANCE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_WALLET_BALANCE_FULFILLED:
            return {
                ...state,
                loading: false,
                wallet: action.payload
            }

        case GET_WALLET_BALANCE_REJECTED:
            return {
                ...state,
                loading: false,
                wallet: []
            }

        case WALLET_TOPUP_REQUEST:
            return {
                ...state,
                loading: true
            }

        case WALLET_TOPUP_FULFILLED:
            return {
                ...state,
                loading: false,
                topup: true,
                walletRes: action.payload
            }

        case WALLET_TOPUP_REJECTED:
            return {
                ...state,
                loading: false,
                topup: false
            }

        case GET_COUNTRIES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_COUNTRIES_FULFILLED:
            return {
                ...state,
                loading: false,
                countries: action.payload
            }

        case GET_COUNTRIES_REJECTED:
            return {
                ...state,
                loading: false,
                countries: []
            }

        case PROFILE_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PROFILE_UPDATE_FULFILLED:
            return {
                ...state,
                loading: false,
                updated: true
            }

        case PROFILE_UPDATE_REJECTED:
            return {
                ...state,
                loading: false,
                updated: false
            }

        case GAMES_PLAYED_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GAMES_PLAYED_FULFILLED:
            return {
                ...state,
                loading: false,
                games: action.payload
            }

        case GAMES_PLAYED_REJECTED:
            return {
                ...state,
                loading: false,
                games: null
            }

        default:
            return state;
    }
};

export default profileReducer;