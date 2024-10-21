import { configureStore } from '@reduxjs/toolkit';
import themeConfigReducer from './themeConfigSlice';
import cartSlice from './cartSlice';
import { saveState } from '../utils/localStorage';

const store = configureStore({
  reducer: {
    themeConfig: themeConfigReducer,
    cart : cartSlice
  },
});

let previousCartState = store.getState().cart;

// Subscription 
store.subscribe(() =>{
  const state = store.getState().cart;
  if(! _.isEqual(state,previousCartState)) {
    previousCartState = state;
    saveState('cart',state);
  }
  
})

export default store;