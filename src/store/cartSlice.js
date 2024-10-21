import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
        clearCart:(state,action) => {
            state.items =[];
        }
    }

})

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
