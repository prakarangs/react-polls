import fetch from 'cross-fetch';
import {
  FETCH_QUESTIONS_SUCCESS,
  QUESTIONS_HAVE_ERROR,
  QUESTIONS_LOADING
} from './types';

const ROOT_URL = 'https://polls.apiblueprint.org/questions';

export function fetchQuestions() {
  return dispatch => {
    dispatch(questionsLoading(true));
    fetch(ROOT_URL)
      .then( resp => {
        if (resp.status >= 400) {
          throw new Error('Bad response from server');
        }
        return resp.json();
      })
      .then( resp => {
        dispatch(fetchQuestionsSuccess(resp));
        dispatch(questionsLoading(false));
      })
      .catch(() => {
        dispatch(questionsHaveError(true));
      });
  }
}

export function fetchQuestionsSuccess(questions) {
  return {
    type: FETCH_QUESTIONS_SUCCESS,
    questions
  };
}

export function questionsHaveError(bool) {
  return {
    type: QUESTIONS_HAVE_ERROR,
    hasError: bool
  };
}

export function questionsLoading(bool) {
  return {
    type: QUESTIONS_LOADING,
    isLoading: bool
  };
}