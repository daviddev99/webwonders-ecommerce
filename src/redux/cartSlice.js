import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const isItemInCart = state.carts.find((item) => item.id === action.payload.id)

      if(isItemInCart){
        const tempCart = state.carts.map((item) => {
          if(item.id === action.payload.id){
            let tempQty = item.quantity + action.payload.quantity
            let tempTotalPrice = item.quantity * action.payload.totalPrice
            return {
              ...item, quantity: tempQty, totalPrice: tempTotalPrice
            }
          } else {
            return item
          }
        })
        state.carts = tempCart
      }else{
        state.carts.push(action.payload)
      }
    },
    deleteFromCart(state, action) {
      const tempCarts = state.carts.filter(
        (item) => item.id !== action.payload.id
      );
      state.carts = tempCarts;
    },
    clearCart(state) {
      state.carts = [];
    },
    getCartTotal(state) {
      state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);
      state.totalItems = state.carts.length
    },
    toggleCartQty(state,action){
      const tempCart = state.carts.map((item)=>{
        if(item.id === action.payload.id){
          let tempQty = item.quantity
          let tempTotalPrice = item.totalPrice

          if(action.type === 'INC'){
            tempQty++;
            tempTotalPrice = tempQty * item.totalPrice
          }
          
          if(action.type === "DEC"){
            tempQty--
            tempTotalPrice = tempQty * item.totalPrice
          }
          
          return {...item, quantity: tempQty, totalAmount: tempTotalPrice}
        }else{
          return item
        }
      })
      state.carts = tempCart
    }
  },
});


export const { addToCart, deleteFromCart, clearCart, getCartTotal } = cartSlice.actions;

export const getAllCart = (state) => state.cart.carts;
export const getTotalAmount = (state) => state.cart.totalAmount
export const getTotalItems = (state) => state.cart.totalItems

export default cartSlice.reducer;