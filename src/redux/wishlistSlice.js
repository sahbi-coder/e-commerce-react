import { createSlice, current } from "@reduxjs/toolkit";

const whishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    isFeching:false,
    error:false,
  
  },
  reducers: {
    addToList: (state, action) => {
      const isInList = state.products.reduce((pre, cur) => {
        if (cur._id === action.payload._id) {
          return true;
        }
        return pre
      },false);
      if (!isInList) {
        state.products = [...state.products, action.payload];
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
    wishlistNotCreated:(state,action)=>{
      state.created = false
    },
    wishlistCreatedSuccess:(state,action)=>{
      state.created = true
    },
    success:(state,action)=>{
      state.isFeching = false
      state.error = true
    },
    start:(state,action)=>{
      state.isFeching = true
      state.error =false
    },
    failure:(state,action)=>{
      state.isFeching = false
      state.error = true
    },
  },
});
export const { addToList, deleteAll, deleteById,addList,start,failure,success} = whishlistSlice.actions;
export default whishlistSlice.reducer;
