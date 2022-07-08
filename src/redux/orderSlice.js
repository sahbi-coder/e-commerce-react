import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
   
    orders: [],
    isFetching:false,
    error:false,
    orderToAdd:null
  
    
  },
  reducers: {
    setOrders:(state,action)=>{
        state.orders = action.payload
       

    },
    addOrder:(state)=>{
      
        state.orders.push(state.orderToAdd)      
        state.orderToAdd = null

    },
    removeOrder:(state,action)=>{
        state.orders = [...state.orders].reduce((pre,acc)=>{
            if(action.payload===acc._id){
                return pre
            }
            pre.push(acc)
            return pre
        },[])

    },
    modifyAddress:(state,action)=>{
        state.orders = [...state.orders].reduce((pre,acc)=>{
            if(action.payload===acc._id){
                acc.address = action.payload
                return acc
            }
            pre.push(acc)
            return pre
        },[])


    },
    modifyphone:(state,action)=>{
        state.orders = [...state.orders].reduce((pre,acc)=>{
            if(action.payload===acc._id){
                acc.phone = action.payload
                return acc
            }
            pre.push(acc)
            return pre
        },[])


    },
    orderStart:(state,action)=>{
       state.isFetching = true
       state.error = false
    },
    orderSuccess:(state,action)=>{
        state.isFetching = false
        state.error = false

    },
    orderFailure:(state,action)=>{
        state.isFetching = false
        state.error = true
    },
    setOrderToAdd:(state,action)=>{
        state.orderToAdd = action.payload
    },
    removeOrderToAdd:(state,action)=>{
        state.orderToAdd = null
        
    },
    clearOrders:(state,action)=>{
        state.orders =[]
    },
    

    
  
  },
});
export const {
    setOrders,
    addOrder,
    removeOrder,
    modifyAddress,
    modifyphone,
    orderStart,
    orderSuccess,
    orderFailure,
    setOrderToAdd,
    removeOrderToAdd,
    clearOrders

} = orderSlice.actions;

export default orderSlice.reducer;
