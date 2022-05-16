import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        currentUser:null,
        isFetshing:false,
        error:false
    },
    reducers:{
        init:(state)=>{
            state.isFetshing = false;
            state.error = false
        },
        loginStart:(state)=>{
            
            state.isFetshing=true;
            
            
        },
        loginSucess:(state,action)=>{
            state.isFetshing=false;
            state.currentUser = action.payload.user
        },
     
        loginFailure:(state)=>{
            state.isFetshing=false;
            state.error=true;
        },
        signUpStart:(state)=>{
            
            state.isFetshing=true;
            
            
        },
        signUpSucess:(state)=>{
            state.isFetshing=false;
            
        },
     
        signUpFailure:(state)=>{
            state.isFetshing=false;
            state.error=true;
        },
        logOut:(state)=>{
            state.currentUser = null
        }
    }
})
export const {loginFailure,loginStart,loginSucess,signUpFailure,signUpStart,signUpSucess,logOut,init} = userSlice.actions
export default userSlice.reducer