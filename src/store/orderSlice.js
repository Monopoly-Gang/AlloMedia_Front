import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../utils/axiosRequests";
import { toast } from "sonner";


// Thunk functions to fetch and insert data

export const insertOrder = createAsyncThunk(
    "order/insertOrder",
    async(orderData,thunkApi)=>{
        const uri= "orders";
        try{
            return  await postRequest(uri,orderData);
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async(_,thunkApi)=>{
        const uri= "orders";
        try{
            return await getRequest(uri);
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

// Order slice

const initialState = {
    items : [],
    restaurant:0,
    client:0,
    totalAmount:0,
    loading: false,
    error:null,
};

const orderSlice = createSlice({
    name:"order",
    initialState,

    reducers :{
        initializeOrder:(state,action)=>{
            state.items = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
            state.restaurant = action.payload.restaurant;
            state.client = action.payload.client;

        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(insertOrder.pending,(state) =>{
            state.loading=true;
        })
        .addCase(insertOrder.fulfilled,(state, action) =>{
            const items = action.payload.items;
            const restaurant = action.payload.restaurant;
            const client = action.payload.client;
            state.loading=false;
            state.items = items;
            state.restaurant = restaurant;
            state.client = client;
            state.totalAmount = items.reduce((total,item)=>total+item.quantity*item.price);
            console.log("mmmmmmmmmmmmmmmmmmmmmmmm");
            toast.success("Order passed");
        })
        .addCase(insertOrder.rejected,(state,action)=>{
            state.loading = false;
            state.error=action.payload;
        })
    }
})

export const { initializeOrder } = orderSlice.actions; // Only export initializeOrder
export default orderSlice.reducer;
