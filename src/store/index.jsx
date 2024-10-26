import { configureStore } from '@reduxjs/toolkit';
import themeConfigReducer from './themeConfigSlice';
import restaurantsReducer from './hundleRestosRequestSlice';

const store = configureStore({
  reducer: {
    themeConfig: themeConfigReducer,
    restaurants: restaurantsReducer, // Consistent lowercase naming
  },
});

export default store;
