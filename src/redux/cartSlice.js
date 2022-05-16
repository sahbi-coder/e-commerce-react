import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
      state.quantity = state.quantity + 1;
      state.total = state.total + action.payload.price * action.payload.amount;
    },
    addProducts: (state, action) => {
      state.products = action.payload;
      state.quantity = action.payload.length;
      const total = action.payload.reduce((pre,acc)=>{
          pre += acc.amount*acc.price
          return pre
      },0)
      state.total = total
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    removeOrder: (state, action) => {
      if (state.quantity) {
          let deletedOrd = null;
          const temp = state.products.reduce((pre, acc) => {
              if (action.payload === acc._id) {
                  deletedOrd = acc
                  return pre;
                }
                pre.push(acc);
                return pre;
            }, []);
            state.products = temp;
            state.total =
              state.total - deletedOrd.price * deletedOrd.amount;
            state.quantity = state.quantity - 1;
      }
    },
  },
});
export const { addProduct, clearCart ,removeOrder,addProducts} = cartSlice.actions;
export default cartSlice.reducer;
