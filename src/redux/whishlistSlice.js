import {createSlice} from "@reduxjs/toolkit";

const whishlistSlice = createSlice({
    name:'wishlist',
    initialState:{
        products:[],
  
    },
    reducers:{
        addToList:(state,action)=>{
            
            
                state.products=[...state.products,action.payload];
        
            
        }
    }
})
export const {addToList} = whishlistSlice.actions
export default whishlistSlice.reducer