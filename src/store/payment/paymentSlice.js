import { createSlice } from "@reduxjs/toolkit";

export const templateSlice = createSlice({
  name: "template",
  initialState: {
    paymentIntent: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    createPaymentStart(state) {
        state.isLoading = true;
        state.error = null;
      },
      createPaymentSuccess(state, action) {
        state.isLoading = false;
        state.paymentIntent = action.payload;
      },
      createPaymentFailure(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },
      clearPaymentState(state) {
        state.paymentIntent = null;
        state.isLoading = false;
        state.error = null;
      },
  },
});

// Action creators are generated for each case reducer function
export const { createPaymentStart, createPaymentSuccess, createPaymentFailure, clearPaymentState } = templateSlice.actions;

