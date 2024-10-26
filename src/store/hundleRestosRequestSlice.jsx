import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching restaurant data
export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async () => {
    const response = await axios.get('http://localhost:3000/api/restaurants');
    return response.data;
  }
);

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    restaurants: [],
    status: 'idle',
    error: null,
  },
  reducers: {}, // Add reducers here if you need additional actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the async action and the reducer
export default restaurantsSlice.reducer;
