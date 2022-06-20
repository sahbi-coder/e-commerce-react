import { createSlice } from "@reduxjs/toolkit";

export const CARTACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = [
        ...state.products,
        { ...action.payload, id: new Date().getTime() },
      ];
      state.quantity = state.quantity + 1;
      state.total = state.total + action.payload.price * action.payload.amount;
    },
    addProducts: (state, action) => {
      state.products = action.payload;
      state.quantity = action.payload.length;
      const total = action.payload.reduce((pre, acc) => {
        pre += acc.amount * acc.price;
        return pre;
      }, 0);
      state.total = total;
    },
    modifyProduct: (state, action) => {
     
      console.log(action)
      for(let i =0;i<state.products.length;i++){
        
        if (action.payload.payload === state.products[i].id) {
       
          if (action.payload.type === CARTACTIONS.INCREMENT) {
            console.log(158)
            state.total += state.products[i].price;
            let temp = state.products
            let innerTemp  =temp[i]
            innerTemp.amount += 1
            temp[i]=innerTemp
            state.products = temp;
            return
          }
          if (state.products[i].amount > 1) {
            state.total -= state.products[i].price;
            let temp = state.products
            let innerTemp  =temp[i]
            innerTemp.amount -= 1
            temp[i]=innerTemp
            state.products = temp;
          }
        }
      }
      
      
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
          if (action.payload === acc.id) {
            deletedOrd = acc;
            return pre;
          }
          pre.push(acc);
          return pre;
        }, []);
        state.products = temp;
        state.total = state.total - deletedOrd.price * deletedOrd.amount;
        state.quantity = state.quantity - 1;
      }
    },
  },
});
export const {
  addProduct,
  clearCart,
  removeOrder,
  addProducts,
  modifyProduct,
  
} = cartSlice.actions;

export default cartSlice.reducer;
