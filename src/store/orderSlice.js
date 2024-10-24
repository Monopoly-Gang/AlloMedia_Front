import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../utils/axiosRequests";


// Thunk functions to fetch and insert data

const insertOrder = createAsyncThunk(
    "order/insertOrder",
    async(orderData,thunkApi)=>{
        const uri= "api/orders";
        try{
            return  await postRequest(uri,orderData);
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async(thunkApi)=>{
        const uri= "api/orders";
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
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(insertOrder.pending,(state) =>{
            state.loading=true;
        })
        .addCase(insertOrder.fulfilled,(state, action) =>{
            const items = action.payload.items;
            state.loading=false;
            state.items = items;
            state.totalAmount = items.reduce((total,item)=>total+item.quantity*item.price);
        })
        .addCase(insertOrder.rejected,(state,action)=>{
            state.loading = false;
            state.error=action.payload;
        })
    }
})