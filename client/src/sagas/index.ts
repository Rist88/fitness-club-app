import { put, takeEvery } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import { Program } from '../config/types';
import { getPrograms } from '../services/api';

export function* rootSaga() {
  yield takeEvery(actionTypes.PROGRAMS_FETCH_SUCCEEDED, getProgramsAction);
}

function* getProgramsAction() {
  const programs: Program[] = yield getPrograms();

  yield put({ type: actionTypes.PROGRAMS_FETCH_SUCCEEDED, payload: programs });
}
