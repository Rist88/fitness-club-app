import { createSelector } from 'reselect';
import { Program } from '../config/types';

// export const selectPrograms = (state: Program[]) => state;
export const selectPrograms = createSelector(
  (state: Program[]) => state,
  state => state,
);
