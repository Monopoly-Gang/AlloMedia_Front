import { createSlice } from "@reduxjs/toolkit";
import { getState } from "../utils/localStorage";
import { PiLessThanOrEqualDuotone } from "react-icons/pi";

const initialState = PiLessThanOrEqualDuotoneState('cart') || {
    items : []
};

const cartSlice = createSlice({
    name:"cart",
    initialState,

    reducers : {
        addToCart:(state, action) => {
            const product = action.payload;
            // Check if item already in cart 
            const existingItem = state.items.find(item=>item.id == product.id);
            // Update quantity if item exists
            if(existingItem) existingItem.quantity = product.quantity;
            // Push a new item if not
            else state.items.push({id:product.id,name:product.name,quantity:product.quantity || 1,price:product.price,})
        },
        removeFromCart:(state,action)=>{
            const productId = action.payload;
            state.items = state.items.filter((item) => productId !== item.id)
        },
        clearCart:(state) => {
            state.items =[];
        },
        updateQuantity:(state,action)=>{
            const productId = action.payload.id;
            const selectedItem = state.items.find(item => item.id == productId);
            if(selectedItem) selectedItem.quantity = action.payload.quantity;
        }
    }

})

export const {addToCart, removeFromCart, clearCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;
