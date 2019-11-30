import axios from 'axios'
import { AsyncStorage } from 'react-native'

import {
  GET_QUIZ_ACTION_TYPES,
  GET_QUIZ_QUESTION_ACTION_TYPES,
  POST_ANSWER_ACTION_TYPES,
  SUBMIT_QUIZ_ACTION_TYPES,
  PAYMENT_ACTION_TYPES
} from "./actionTypes";

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
const BASE_URL = "https://immense-badlands-40083.herokuapp.com";

// THUNKS
const allQuiz = () => {
  return async (dispatch, getState) => {
    dispatch(fetchQuizRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/quiz`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const quiz = response.data;
      console.log("all quiz ==> ", quiz);
      dispatch(fetchQuizFulfilled(quiz));
    } catch (e) {
      console.log(e);
      dispatch(fetchQuizRejected());
    }
  };
};

const question = (id) => {
  console.log(id)
  return async (dispatch, getState) => {
    dispatch(fetchQuizQuestionRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/quiz/questions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const question = response.data;
      console.log("question ==> ", question);
      dispatch(fetchQuizQuestionFulfilled(question));
    } catch (e) {
      console.log(e);
      dispatch(fetchQuizQuestionRejected());
    }
  };
};

const postAnswer = (option, question_id, time_spent, campaign_id) => {
  console.log(option, question_id, time_spent, campaign_id)
  return async (dispatch, getState) => {
    dispatch(postAnswerRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/quiz/post-answer/${campaign_id}`,
        {
          "answer": option,
          "question-id": question_id,
          "time-spent": time_spent
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const score = response.data.score
      console.log("posted answer ==>", response.data)
      return dispatch(postAnswerFulfilled(score));
    } catch (e) {
      console.log(e);
      dispatch(postAnswerRejected());
    }
  };
};

const submitQuiz = (id) => {
  console.log(id)
  return async (dispatch, getState) => {
    dispatch(fetchSubmitRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/quiz/submit/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const submit = response.data;
      console.log("submit response ==> ", submit);
      dispatch(fetchSubmitFulfilled(submit));
    } catch (e) {
      console.log(e);
      dispatch(fetchSubmitRejected());
    }
  };
};

const payment = (data, id) => {
  return async (dispatch, getState) => {
    dispatch(paymentRequest());
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/quiz/payment/${id}`,
        data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const payment = response.data.data;
      console.log("payment ==>", payment)
      return dispatch(paymentFulfilled(payment));
    } catch (e) {
      console.log(e);
      dispatch(paymentRejected());
    }
  };
};

// ACTION CREATORS

const fetchQuizRequest = () => ({
  type: GET_QUIZ_REQUEST
});

const fetchQuizFulfilled = quiz => ({
  type: GET_QUIZ_FULFILLED,
  payload: quiz
});

const fetchQuizRejected = () => ({
  type: GET_QUIZ_REJECTED
});

const fetchQuizQuestionRequest = () => ({
  type: GET_QUIZ_QUESTION_REQUEST
});

const fetchQuizQuestionFulfilled = question => ({
  type: GET_QUIZ_QUESTION_FULFILLED,
  payload: question
});

const fetchQuizQuestionRejected = () => ({
  type: GET_QUIZ_QUESTION_REJECTED
});

const postAnswerRequest = () => ({
  type: POST_ANSWER_REQUEST
});

const postAnswerFulfilled = (score) => ({
  type: POST_ANSWER_FULFILLED,
  payload: score
});

const postAnswerRejected = () => ({
  type: POST_ANSWER_REJECTED
});

const fetchSubmitRequest = () => ({
  type: SUBMIT_QUIZ_REQUEST
});

const fetchSubmitFulfilled = (submit) => ({
  type: SUBMIT_QUIZ_FULFILLED,
  payload: submit
});

const fetchSubmitRejected = () => ({
  type: SUBMIT_QUIZ_REJECTED
});

const paymentRequest = () => ({
  type: PAYMENT_REQUEST
});

const paymentFulfilled = (submit) => ({
  type: PAYMENT_FULFILLED,
  payload: submit
});

const paymentRejected = () => ({
  type: PAYMENT_REJECTED
});


export { allQuiz, question, postAnswer, submitQuiz, payment }