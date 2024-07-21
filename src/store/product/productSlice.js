import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        selectedProduct: {},
        isLoading: false,
        errorProductMessage: undefined,
        successMessage: undefined
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
            state.errorProductMessage = undefined;
            state.successMessage = undefined;
        },
        loadProducts: (state, { payload }) => {
            state.products = payload;
            state.isLoading = false;
            state.errorProductMessage = undefined;
            state.successMessage = undefined;
        },
        onCreateProduct: (state, { payload }) => {
            state.products = [...state.products, payload];
            state.isLoading = false;
            state.errorProductMessage = undefined;
            state.successMessage = 'Product created successfully';
        },
        onDeleteProduct: (state, { payload }) => {
            state.products = state.products.filter(product => product.id !== payload);
            state.isLoading = false;
            state.errorProductMessage = undefined;
            state.successMessage = 'Deleted successfully';
        },
        onSendError: (state, { payload }) => {
            state.errorProductMessage = payload;
        },
        onSelectProduct: (state, { payload }) => {
            state.selectedProduct = payload
            state.isLoading = false;
            state.errorProductMessage = undefined;
        },
        onUpdateProduct: (state, {payload}) =>{
            state.products = state.products.map(product =>{
                if(product.id === payload.id){
                    return payload
                }
                return product
            })
            state.isLoading = false;
            state.errorProductMessage = undefined;
            state.successMessage = 'Update successfully';
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct={}
        },
        clearMessage: (state) => {
            state.errorProductMessage = undefined;
            state.successMessage = undefined;
        }
    },
});

// Action creators are generated for each case reducer function
export const { loadProducts, onLoading, onSendError, clearMessage, onCreateProduct, onDeleteProduct, onSelectProduct, onUpdateProduct, clearSelectedProduct } = productSlice.actions;