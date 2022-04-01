import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        currentUser:null,
        isFetshing:false,
        error:false
    },
    reducers:{
        loginStart:(state)=>{
            
            state.isFetshing=true;
            
            
        },
        loginSucess:(state,action)=>{
            state.isFetshing=false;
            state.currentUser = action.payload
        },
        loginFailure:(state)=>{
            state.isFetshing=false;
            state.error=true;
        }
    }
})
export const {loginFailure,loginStart,loginSucess} = userSlice.actions
export default userSlice.reducer