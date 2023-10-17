import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryNumber: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryNumber: (state, action) => {
      state.categoryNumber = action.payload;
    },
    setSortMethod: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryNumber, setSortMethod } = filterSlice.actions;
export default filterSlice.reducer;
