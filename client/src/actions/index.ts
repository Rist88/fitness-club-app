import { Program } from '../config/types';
import { actionTypes } from './actionTypes';

export const actions = {
  getProgramsAction: (programs: Program[]) => ({ type: actionTypes.PROGRAMS_FETCH_SUCCEEDED, payload: programs }),
};
