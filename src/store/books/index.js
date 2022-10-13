import {createSelector, createSlice} from '@reduxjs/toolkit';
import * as bookThunks from './thunks';
import {BookReducer} from '../constants';

const initialState = {
  subjects: [],
  selectedSubject: '',
  books: [],
  selectedBook: {},
  showModal: false,
  modalContext: '',
};

export const BooksSlice = createSlice({
  name: BookReducer,
  initialState,
  reducers: {
    subjects: (state, action) => {
      return {
        ...state,
        subjects: action.payload,
      };
    },
    subjectChange: (state, action) => {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },
    books: (state, action) => {
      state.books = action.payload;
    },
    bookSelect: (state, action) => {
      state.selectedBook = action.payload;
      state.showModal = true;
      state.modalContext = BOOK_SELECT;
    },
    toggleModal: (state, action) => {
      state.showModal = !state.showModal;
      if (state.showModal) {
        state.modalContext = BOOK_ADD;
      }
    },
  },
});

// export const BookCategories = () => async (dispatch) => {
//   const res = await api.get('/subjects').catch((error) => console.log(error));
//   dispatch(subjects(res.data));
// };

// export const FetchBooks = (subject) => async (dispatch) => {
//   const res = await api
//     .get(`/books?subjects_like=${subject}`)
//     .catch((error) => console.log(error));
//   dispatch(books(res.data));
// };

const {reducer, actions} = BooksSlice;

export const bookSelector = (state) => state;

export const bookState = createSelector(bookSelector, (state) => state);

export const bookActions = {
  ...actions,
  ...bookThunks,
};

export const {subjects, subjectChange, books, bookSelect, toggleModal} =
  BooksSlice.actions;

export default BooksSlice.reducer;
