import { actionTypes } from '../actions/actionTypes';
import { Program } from '../config/types';

export const rootReducer = (state: Program[] = [], action: { type: string; payload: Program[] }) => {
  switch (action.type) {
    case actionTypes.PROGRAMS_FETCH_SUCCEEDED:
      return action.payload;

    default:
      return state;
  }
};
