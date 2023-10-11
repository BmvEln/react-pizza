import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryNumber: 0,
  presentPage: 1,
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
    setPresentPage: (state, action) => {
      state.presentPage = action.payload;
    },
  },
});

export const { setCategoryNumber, setSortMethod, setPresentPage } = filterSlice.actions;
export default filterSlice.reducer;
