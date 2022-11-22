import { put, takeEvery } from 'redux-saga/effects';
import { actions } from '../actions';
import { actionTypes } from '../actions/actionTypes';
import { Program } from '../config/types';
import { getPrograms } from '../services/api';

export function* rootSaga() {
  yield takeEvery(actionTypes.PROGRAMS_FETCH_SUCCEEDED, getProgramsSaga);
}

function* getProgramsSaga() {
  const programs: Program[] = yield getPrograms();

  yield put(actions.getProgramsAction(programs));
}
