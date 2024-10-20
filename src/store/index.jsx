import { configureStore } from '@reduxjs/toolkit';
import themeConfigReducer from './themeConfigSlice';

const store = configureStore({
  reducer: {
    themeConfig: themeConfigReducer,
  },
});
export default store;