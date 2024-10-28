import { configureStore } from '@reduxjs/toolkit';
import themeConfigReducer from './themeConfigSlice';
import authReducer from './AuthSlice';

const store = configureStore({
  reducer: {
    themeConfig: themeConfigReducer,
    auth: authReducer,
  },
});

export default store;
