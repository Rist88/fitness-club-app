import { Program } from '../config/types';
import { reduxActionTypes, sagaActionTypes } from './actionTypes';

export const actionSetPrograms = (programs: Program[]) => ({
  type: reduxActionTypes.SET_PROGRAMS,
  payload: programs,
});

export const actionGetPrograms = () => ({
  type: sagaActionTypes.GET_PROGRAMS_REQUEST,
});
