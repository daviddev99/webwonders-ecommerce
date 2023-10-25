import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}products/categories`);
    const data = await response.json();
    return data;
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  "categories-products/fetch",
  async (category) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}products/category/${category}`)
    const data = await response.json()
    return data.products
  }
);

const initialState = {
  categories: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: [],
  categoryProductsStatus: STATUS.IDLE,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = STATUS.LOADING;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = STATUS.FAILED;
      })
      
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.categoryProductsStatus = STATUS.LOADING
      })

      .addCase(fetchCategoryProducts.fulfilled, (state,action) => {
        state.categoryProducts = action.payload
        state.categoryProductsStatus = STATUS.SUCCEEDED
      })

      .addCase(fetchCategoryProducts.rejected, (state) => {
        state.categoryProductsStatus =STATUS.FAILED
      })
  },
});


export const getAllCategories = (state) => state.category.categories;
export const getCategoryProducts = (state) => state.category.categoryProducts;
export const getCategoryProductsStatus = (state) => state.category.categoryProductsStatus;

export default categorySlice.reducer;