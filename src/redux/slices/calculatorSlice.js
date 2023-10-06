import { createSlice } from '@reduxjs/toolkit';

// Реализация калькулятора с помощью ReduxTookit
const initialState = {
  value: 0,
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: initialState,
  reducers: {
    addition: (state) => {
      state.value += 2;
    },
    subtraction: (state) => {
      state.value -= 2;
    },
    multiplication: (state) => {
      state.value *= 2;
    },
    division: (state) => {
      state.value /= 2;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addition, subtraction, multiplication, division } = calculatorSlice.actions;

export default calculatorSlice.reducer;
