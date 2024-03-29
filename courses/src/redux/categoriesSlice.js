import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './requests';


export const categoriesSlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })

    }
});



export default categoriesSlice.reducer;