import axios from 'axios';
import {FETCH_QUESTIONS_SUCCESS, QUESTIONS_HAVE_ERROR, QUESTIONS_LOADING, FETCH_QUESTION, VOTE_ON_CHOICE} from './types';

const ROOT_URL = 'https://polls.apiblueprint.org/';

export function fetchQuestions() {
  let url = `${ROOT_URL}/questions`;
  let request = axios.get(url);

  return dispatch => {
    dispatch(questionsLoading(true));
    request.then(resp => {
      dispatch(fetchQuestionsSuccess(resp.data));
      dispatch(questionsLoading(false));
    }).catch(() => {
      dispatch(questionsHaveError(true));
    });
  }
}

export function fetchQuestionsSuccess(questions) {
  return {type: FETCH_QUESTIONS_SUCCESS, questions};
}

export function questionsHaveError(bool) {
  return {type: QUESTIONS_HAVE_ERROR, hasError: bool};
}

export function questionsLoading(bool) {
  return {type: QUESTIONS_LOADING, isLoading: bool};
}

export function fetchSingleQuestion(id) {
  let url = `${ROOT_URL}/questions/${id}`;
  let request = axios.get(url);

  return dispatch => {
    dispatch(questionsLoading(true));
    request.then(resp => {
      dispatch(fetchSingleQuestionSuccess(resp.data));
      dispatch(questionsLoading(false));
    }).catch(() => {
      dispatch(questionsHaveError(true));
    });
  }
}

export function fetchSingleQuestionSuccess(question) {
  return {type: FETCH_QUESTION, question};
}

export function postVote(choice, callback) {
  let request = axios.post(`${ROOT_URL}${choice}`).then(() => callback());
  return {
    type: VOTE_ON_CHOICE,
    payload: request
  };
}