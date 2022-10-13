import {createAsyncThunk} from '@reduxjs/toolkit';

import {api} from '../../api';

import {BookReducer} from '../constants';

export const getBookCategories = createAsyncThunk(
  `${BookReducer}/get-subjects`,
  async (_, thunkAPI) => {
    try {
      const res = await api.get(`/subjects`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      const {message} = error;
      return thunkAPI.rejectWithValue({error: message});
    }
  },
);

export const getBooks = createAsyncThunk(
  `${BookReducer}/get-books`,
  async (subject, {fulfillWithValue, rejectWithValue}) => {
    try {
      const res = await api.get(`/books?subjects_like=${subject}`);
      return fulfillWithValue(res.data);
    } catch (error) {
      const {message} = error;
      return rejectWithValue({error: message});
    }
  },
);
