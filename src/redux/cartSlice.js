import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addProduct:(state,action)=>{
            
            
                state.products=[...state.products,action.payload];
                state.quantity=state.quantity+1;
                state.total=state.total+action.payload.price*action.payload.amount;
            
        },
        clearCart:(state)=>{
            state.products=[];
            state.quantity=0;
            state.total=0;

        }
    }
})
export const {addProduct,clearCart} = cartSlice.actions
export default cartSlice.reducer
