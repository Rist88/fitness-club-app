import { reduxActionTypes } from '../actions/actionTypes';
import { Program } from '../config/types';

type IProgramsState = Program[];
const initialState: IProgramsState = [];

export const programsReducer = (state: Program[] = initialState, action: { type: string; payload: Program[] }) => {
  switch (action.type) {
    case reduxActionTypes.SET_PROGRAMS:
      return action.payload;

    default:
      return state;
  }
};
