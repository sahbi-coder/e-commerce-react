import { createSlice, current } from "@reduxjs/toolkit";

const whishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
  },
  reducers: {
    addToList: (state, action) => {
      const isInList = state.products.reduce((pre, cur) => {
        if (cur._id === action.payload.product._id) {
          return true;
        }
        return pre
      },false);
      if (!isInList) {
        state.products = [...state.products, action.payload.product];
      }
    },
    addList:(state,action)=>{
        state.products = action.payload
    }
    ,
    deleteAll: (state) => {
      state.products = [];
    },
    deleteById: (state, action) => {
      const temp = state.products.reduce((pre, cur) => {
        if (cur._id !== action.payload) {
          pre.push(cur);
          return pre;
        }
        return pre;
      }, []);

      state.products = temp;
    },
  },
});
export const { addToList, deleteAll, deleteById,addList } = whishlistSlice.actions;
export default whishlistSlice.reducer;
