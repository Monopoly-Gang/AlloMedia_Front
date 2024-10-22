import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../utils/localStorage";

const initialState = loadState('cart') || {
    items : [],
    totalAmount :0,
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
            else state.items.push({id:product.id,name:product.name,quantity:product.quantity || 1,price:product.price});
            // calculate total
            state.totalAmount=state.items.reduce((totalAmount,item)=>totalAmount+item.quantity*item.price);
        },
        removeFromCart:(state,action)=>{
            const productId = action.payload;
            state.items = state.items.filter((item) => productId !== item.id);
            state.totalAmount=state.items.reduce((totalAmount,item)=>totalAmount+item.quantity*item.price);
        },
        clearCart:(state) => {
            state.items =[];
            state.totalAmount = 0;
        },
        updateQuantity:(state,action)=>{
            const productId = action.payload.id;
            const selectedItem = state.items.find(item => item.id == productId);
            if(selectedItem){
                selectedItem.quantity = selectedItem.quantity+action.payload.quantity;
                state.totalAmount=state.items.reduce((totalAmount,item)=>totalAmount+item.quantity*item.price);
            }
        }
    }

})

export const {addToCart, removeFromCart, clearCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;
