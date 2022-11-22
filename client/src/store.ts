import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './sagas';
import { programsReducer } from './reducers';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(programsReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
