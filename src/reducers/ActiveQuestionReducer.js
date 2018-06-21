import { FETCH_QUESTION } from '../actions/types';

export function activeQuestion(state = {}, action) {
  switch (action.type) {
    case FETCH_QUESTION:
      return Object.assign({}, state, action.question);
    default:
      return state;
  }
}