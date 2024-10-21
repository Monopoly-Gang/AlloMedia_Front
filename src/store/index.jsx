import { configureStore } from '@reduxjs/toolkit';
import themeConfigReducer from './themeConfigSlice';
import cartSlice from './cartSlice';

const store = configureStore({
  reducer: {
    themeConfig: themeConfigReducer,
    cart : cartSlice
    
  },
});
export default store;