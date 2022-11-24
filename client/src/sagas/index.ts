import { put, takeEvery } from 'redux-saga/effects';
import { actionSetPrograms } from '../actions';
import { sagaActionTypes } from '../actions/actionTypes';
import { Program } from '../config/types';
import { getPrograms } from '../services/api';

export function* rootSaga() {
  yield takeEvery(sagaActionTypes.GET_PROGRAMS_REQUEST, getProgramsSaga);
}

function* getProgramsSaga() {
  const programs: Program[] = yield getPrograms();

  yield put(actionSetPrograms(programs));
}
