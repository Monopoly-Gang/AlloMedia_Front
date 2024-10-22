import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../utils/axiosRequests";
import { useSelector } from "react-redux";

// Thunk functions to fetch and insert data

const insertOrder = createAsyncThunk(
    "order/insertOrder",
    async(orderData,thunkApi)=>{
        const uri="/api/orders";
        try{
            return  await postRequest(uri,orderData);
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);
        }

    }
)

const cartItems = useSelector(state =>state.cart);


const initialState = {
    items : cartItems,
    totalAmount:0,
    loading: false,
    error:null,
};

const orderSlice = createSlice({
    name:"order",
    initialState,

    reducers :{},
    extraReducers: (builder) =>{
        builder
        .addCase(insertOrder.pending,(state) =>{
            state.loading=true;
        })
        .addCase(insertOrder.fulfilled,(state, action) =>{
            state.loading=false;
            state.items = action.payload;
        })
        .addCase(insertOrder.rejected,(state,action)=>{
            state.loading = false;
            state.error=action.payload;
        })

    }
})