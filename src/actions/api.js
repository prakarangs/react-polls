import fetch from 'cross-fetch';
import {
  FETCH_QUESTIONS_SUCCESS,
  QUESTIONS_HAVE_ERROR,
  QUESTIONS_LOADING,
  FETCH_QUESTION
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

export function fetchSingleQuestion(id) {
  let url = `${ROOT_URL}/${id}`;

  return dispatch => {
    dispatch(questionsLoading(true));
    fetch(url)
      .then( resp => {
        if (resp.status >= 400) {
          throw new Error('Bad response from server');
        }
        return resp.json();
      })
      .then( resp => {
        dispatch(fetchSingleQuestionSuccess(resp));
        dispatch(questionsLoading(false));
      })
      .catch(() => {
        dispatch(questionsHaveError(true));
      });
  }
}

export function fetchSingleQuestionSuccess(question) {
  return {
    type: FETCH_QUESTION,
    question
  };
}