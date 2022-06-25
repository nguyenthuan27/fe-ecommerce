import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const paymentModalSlice = createSlice({
  name: "paymentModal",
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    remove: (state) => {
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set, remove } = paymentModalSlice.actions;

export default paymentModalSlice.reducer;
