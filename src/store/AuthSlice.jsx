import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: JSON.parse(localStorage.getItem('user')) || {},
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        temp: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('user');
        },
    },
});

export const { temp, login, logout } = authSlice.actions;
export default authSlice.reducer;
