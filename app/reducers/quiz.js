import {
    GET_QUIZ_ACTION_TYPES,
    GET_QUIZ_QUESTION_ACTION_TYPES,
    POST_ANSWER_ACTION_TYPES,
    SUBMIT_QUIZ_ACTION_TYPES,
    PAYMENT_ACTION_TYPES
} from '../actions/actionTypes'

const {
    GET_QUIZ_REQUEST,
    GET_QUIZ_FULFILLED,
    GET_QUIZ_REJECTED
} = GET_QUIZ_ACTION_TYPES
const {
    GET_QUIZ_QUESTION_REQUEST,
    GET_QUIZ_QUESTION_FULFILLED,
    GET_QUIZ_QUESTION_REJECTED
} = GET_QUIZ_QUESTION_ACTION_TYPES
const {
    POST_ANSWER_REQUEST,
    POST_ANSWER_FULFILLED,
    POST_ANSWER_REJECTED
} = POST_ANSWER_ACTION_TYPES
const {
    SUBMIT_QUIZ_REQUEST,
    SUBMIT_QUIZ_FULFILLED,
    SUBMIT_QUIZ_REJECTED
} = SUBMIT_QUIZ_ACTION_TYPES
const {
    PAYMENT_REQUEST,
    PAYMENT_FULFILLED,
    PAYMENT_REJECTED
} = PAYMENT_ACTION_TYPES
const initialState = {
    loading: false,
    resolved: false,
    quiz: [],
    question: [],
    postedAnswer: false,
    score: 0,
    submitted: false,
    response: [],
    payment: []
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_QUIZ_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_QUIZ_FULFILLED:
            return {
                ...state,
                loading: false,
                quiz: action.payload
            }

        case GET_QUIZ_REJECTED:
            return {
                ...state,
                loading: false,
                quiz: []
            }

        case GET_QUIZ_QUESTION_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_QUIZ_QUESTION_FULFILLED:
            return {
                ...state,
                loading: false,
                resolved: true,
                question: action.payload
            }

        case GET_QUIZ_QUESTION_REJECTED:
            return {
                ...state,
                loading: false,
                resolved: false,
                question: []
            }

        case POST_ANSWER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case POST_ANSWER_FULFILLED:
            return {
                ...state,
                loading: false,
                postedAnswer: true,
                score: action.payload
            }

        case POST_ANSWER_REJECTED:
            return {
                ...state,
                loading: false,
                postedAnswer: false
            }

        case SUBMIT_QUIZ_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SUBMIT_QUIZ_FULFILLED:
            return {
                ...state,
                loading: false,
                submitted: true,
                response: action.payload
            }

        case SUBMIT_QUIZ_REJECTED:
            return {
                ...state,
                loading: false,
                submitted: false
            }

        case PAYMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PAYMENT_FULFILLED:
            return {
                ...state,
                loading: false,
                payment: action.payload,
            }

        case PAYMENT_REJECTED:
            return {
                ...state,
                loading: false,
                payment: []
            }

        default:
            return state;
    }
};

export default quizReducer;