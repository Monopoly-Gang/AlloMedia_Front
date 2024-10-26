import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../utils/localStorage";
import {  toast } from 'sonner'



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
            const existingItem = state.items.find(item=>item.id == product._id);       
            
            // Update quantity if item exists
            if(existingItem){
                console.log("existing item");
                console.log("payload",product);
                existingItem.quantity = product.quantity || existingItem.quantity ;
                toast.success("Item Quantity Updated");
            }
            // Push a new item if not
            else{
                console.log("not existing item");
                console.log("payload",product.id);
                state.items.push({id:product._id,name:product.name,description:product.description,quantity:product.quantity || 1,price:product.price,image:product.image})
                toast.success("Item added to cart");
            } 
            console.log("state.items", JSON.stringify(state.items));
            // calculate total
            state.totalAmount=state.items.reduce((totalAmount,item)=>totalAmount+item.quantity*item.price,0);
        },
        removeFromCart:(state,action)=>{
            const productId = action.payload;
            state.items = state.items.filter((item) => productId !== item.id);
            toast.warning("Item removed");
            state.totalAmount=state.items.reduce((totalAmount,item)=>totalAmount+item.quantity*item.price,0);
        },
        clearCart:(state) => {
            state.items =[];
            toast.warning("Cart cleared");
            state.totalAmount = 0;
        },
        updateQuantity:(state,action)=>{
            const productId = action.payload.id;
            const selectedItem = state.items.find(item => item.id == productId);
            if(selectedItem){
                selectedItem.quantity = selectedItem.quantity+=action.payload.quantity;
                state.totalAmount=state.items.reduce((totalAmount,item)=>totalAmount+item.quantity*item.price,0);
            }
        }
    }

})

export const {addToCart, removeFromCart, clearCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;
