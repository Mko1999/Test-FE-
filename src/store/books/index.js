import {createSelector, createSlice} from '@reduxjs/toolkit';
import * as bookThunks from './thunks';
import {BookReducer} from '../constants';

const initialState = {
  subjects: [],
  loading: false,
  selectedSubject: '',
  books: [],
  selectedBook: {},
};

export const BooksSlice = createSlice({
  name: BookReducer,
  initialState,
  reducers: {
    chooseSubject(state, action) {
      state.selectedSubject = action.payload;
      if (action.payload === null) {
        state.selectedSubject = '';
      }
    },
    chooseBook(state, action) {
      state.selectedBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bookThunks.getBookCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(bookThunks.getBookCategories.fulfilled, (state, action) => {
      state.subjects = action.payload;
      state.loading = false;
    });
    builder.addCase(bookThunks.getBookCategories.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(bookThunks.getBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(bookThunks.getBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });
    builder.addCase(bookThunks.getBooks.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

const {reducer, actions} = BooksSlice;

export const bookSelector = (state) => state;

export const bookState = createSelector(bookSelector, (state) => state.books);

export const bookActions = {
  ...actions,
  ...bookThunks,
};

export default reducer;
