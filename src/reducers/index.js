import {combineReducers} from 'redux';
import { questions, questionsHaveError, questionsLoading } from './QuestionsReducer';

export default combineReducers({
  questions,
  questionsHaveError,
  questionsLoading
});