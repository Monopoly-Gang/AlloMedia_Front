import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import themeConfigReducer from './themeConfigSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    themeConfig: themeConfigReducer,
  },
});
export default store;