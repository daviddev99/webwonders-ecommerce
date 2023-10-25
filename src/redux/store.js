import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from './categorySlice'
import productsReducer from './productsSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        products: productsReducer,
        cart: cartReducer
    }
})