import { combineReducers } from "redux";
import authReducer from "./auth";
import creatorReducer from "./creator";
import quizReducer from "./quiz";

export default combineReducers ({
    quiz: quizReducer,
    creator: creatorReducer,
    auth: authReducer
})