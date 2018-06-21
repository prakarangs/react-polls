import {
  FETCH_QUESTIONS_SUCCESS,
  QUESTIONS_HAVE_ERROR,
  QUESTIONS_LOADING
} from '../actions/types';

export function questions(state = {}, action) {
  switch (action.type) {
    case FETCH_QUESTIONS_SUCCESS:
      return Object.assign({}, state, action);
    default:
      return state;
  }
}

export function questionsHaveError(state = false, action) {
  switch (action.type) {
    case QUESTIONS_HAVE_ERROR:
      return action;
    default:
      return state;
  }
}

export function questionsLoading(state = false, action) {
  switch (action.type) {
    case QUESTIONS_LOADING:
      return action;
    default:
      return state;
  }
}