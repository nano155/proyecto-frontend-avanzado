import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        users:[],
        user:{},
        status:'authenticated',
        errorMessage:undefined

    },
    reducers: {
        onChecking: (state)=>{
            state.status = 'checking'
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, {payload})=>{
            state.status='authenticated';
            state.user={name:payload.name, validateEmail: payload.validate, uid: payload.id, role: payload.role};
            state.errorMessage=undefined;
        },
        onLogout: (state, {payload}) =>{
            state.status='not-authenticated';
            state.user={},
            state.errorMessage=payload
        },
        onGetUsers: (state, {payload})=>{
            state.users = payload
            state.errorMessage= undefined
        },
        onDeleteUser: (state, {payload})=>{
            const userPayload = payload.map(payload.id)
            state.users = state.users.filter(user => !userPayload.includes(user.id))
            state.errorMessage = undefined
        },
        onChangeRole:(state, {payload})=>{
            state.users = state.users.map(user => {
                if(user.id === payload){
                   user.rol = user.rol === 'user'? 'premium': 'user'
                }
                return user
            })
            state.errorMessage = undefined
        },
        clearErrorMessage:(state)=>{
            state.errorMessage=undefined
        }
    },
});

    // Action creators are generated for each case reducer function
export const { clearErrorMessage, onChecking, onLogin, onLogout, onGetUsers, onChangeRole, onDeleteUser } = authSlice.actions;