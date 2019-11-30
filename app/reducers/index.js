import { combineReducers } from "redux";

import authReducer from './auth';
import campaignReducer from './campaign';
import profileReducer from './profile';
import quizReducer from './quiz';

export default combineReducers({
    auth: authReducer,
    campaign: campaignReducer,
    profile: profileReducer,
    quiz: quizReducer,
})
