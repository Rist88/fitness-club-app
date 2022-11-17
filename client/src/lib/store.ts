import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { Program, getPrograms } from './api';
import { put, takeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect';

function* getProgramsAction() {
  const programs: Program[] = yield getPrograms();

  yield put({ type: 'PROGRAMS_FETCH_SUCCEEDED', payload: programs });
}

function* rootSaga() {
  yield takeEvery('PROGRAMS_FETCH_SUCCEEDED', getProgramsAction);
}

const reducer = (state: Program[] = [], action: { type: 'PROGRAMS_FETCH_SUCCEEDED'; payload: Program[] }) => {
  switch (action.type) {
    case 'PROGRAMS_FETCH_SUCCEEDED':
      return action.payload;

    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

// export const selectPrograms = (state: Program[]) => state;
export const selectPrograms = createSelector(
  (state: Program[]) => state,
  state => state,
);
