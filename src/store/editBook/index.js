import {createSelector, createSlice} from '@reduxjs/toolkit';
import {EditBookReducer} from '../constants';

const initialState = {
  id: '',
  authors: [{birth_year: null, death_year: null, name: ''}],
  bookshelves: [],
  download_count: '',
  formats: {},
  languages: [],
  media_type: '',
  subjects: [],
  title: '',
};

export const EditBookSlice = createSlice({
  name: EditBookReducer,
  initialState,
  reducers: {
    cleanState: (state, action) => {
      return {
        ...state,
        id: '',
        title: '',
        download_count: '',
        media_type: '',
        bookshelves: [],
        languages: [],
        subjects: [],
        authors: [
          {
            name: '',
            birth_year: '',
            death_year: '',
          },
        ],
        formats: {},
      };
    },
  },
});

const {reducer, actions} = EditBookSlice;

export const editBookSelector = (state) => state;

export const editBookState = createSelector(
  editBookSelector,
  (state) => state.editBook,
);

export const editBookActions = {
  ...actions,
};

export default reducer;
