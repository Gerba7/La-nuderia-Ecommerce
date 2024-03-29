import { createSlice } from '@reduxjs/toolkit';
import { addCategories, deleteCategory, getCategories } from './httpRequests';


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
            .addCase(addCategories.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories.splice(
                    state.categories.findIndex((category) => category._id === action.payload), 1 // deletes from index one position
                );
            })
            
    }
});


export const { getCategoriesStart, getCategoriesSuccess, getCategoriesFailure, 
    deleteCategoryStart, deleteCategorySuccess, deleteCategoryFailure,
    addCategoryStart, addCategorySuccess, addCategoryFailure } = categoriesSlice.actions;

export default categoriesSlice.reducer;