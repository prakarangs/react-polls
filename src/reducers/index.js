import {combineReducers} from 'redux';
import { questions, questionsHaveError, questionsLoading } from './QuestionsReducer';
import { activeQuestion } from './ActiveQuestionReducer';

export default combineReducers({
  questions,
  questionsHaveError,
  questionsLoading,
  activeQuestion
});