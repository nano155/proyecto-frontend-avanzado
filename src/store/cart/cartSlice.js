import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ticket: [],
    cart: {},
    isLoadingCart: false,
    errorMessageCart: undefined,
    successMessageCart: undefined,
  },
  reducers: {
    onLoadingCart: (state) => {
      state.isLoadingCart = true;
      state.errorMessageCart = undefined;
      state.successMessageCart = undefined;
    },
    loadingCart: (state, { payload }) => {
      state.cart = payload;
      state.isLoadingCart = false;
      state.errorMessageCart = undefined;
      state.successMessageCart = undefined;
    },
    onAddProductToCart: (state, { payload }) => {
      state.cart = payload;
      state.isLoadingCart = false;
      state.errorMessageCart = undefined;
      state.successMessageCart = "Producto agregado exitosamente!";
    },
    onErrorCartMessage: (state, { payload }) => {
      state.errorMessageCart = payload;
    },
    onDeleteProductToCart: (state, { payload }) => {
      state.cart = payload;
      state.isLoadingCart = false;
      state.errorMessageCart = undefined;
      state.successMessageCart = undefined;
    },
    onDeleteAllProducts: (state)=>{
        state.cart = {}
    },
    loadInitialTicket:(state,{payload})=>{
        state.ticket = payload;
        state.isLoadingCart = false;
        state.errorMessageCart = undefined;
    },
    onCreateTicket: (state, { payload }) => {
      state.ticket = [...state.ticket, payload];
      state.isLoadingCart = false;
      state.errorMessageCart = undefined;
    },
    clearCartMessage: (state) => {
      state.errorMessageCart = undefined;
      state.successMessageCart = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onLoadingCart,
  loadingCart,
  onAddProductToCart,
  onErrorCartMessage,
  clearCartMessage,
  onDeleteProductToCart,
  onCreateTicket,
  loadInitialTicket,
  onDeleteAllProducts
} = cartSlice.actions;
