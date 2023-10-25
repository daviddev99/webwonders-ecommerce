import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

const initialState = {
  products: [],
  productsStatus: STATUS.IDLE,
  singleProduct: [],
  singleProductsStatus: STATUS.IDLE,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProducts.pending, (state, action) => {
        state.productsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncProducts.rejected, (state,action) => {
        state.productsStatus = STATUS.FAILED;
      })
      .addCase(fetchAsyncSingleProduct.pending, (state,action) => {
        state.productsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.singleProductsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncSingleProduct.rejected, (state,action) => {
        state.singleProductsStatus = STATUS.FAILED;
      });
  },
});

export const fetchAsyncProducts = createAsyncThunk(
  "products/fetch",
  async (limit) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}products?limit=${limit}`);
    const data = await response.json();
    return data.products;
  }
);

export const fetchAsyncSingleProduct = createAsyncThunk(
  "product-single/fetch",
  async (id) => {
    const response =  await fetch(`${import.meta.env.VITE_API_URL}products/${id}`)
    const data = await response.json()
    return data
  }
);




export const getAllProducts = (state) => state.products.products;
export const getAllProductsStatus = (state) => state.products.productsStatus

export const getSingleProduct = (state) => state.products.singleProduct
export const getSingleProductStatus = (state) => state.products.singleProductsStatus

export default productsSlice.reducer;
