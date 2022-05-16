import { configureStore,combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import wishlistReducer from "./wishlistSlice";
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'root',
    storage,
  }
const rootReducer  =combineReducers({
    user:userReducer,
    cart:cartReducer,
    whishlist:wishlistReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
  

const store = configureStore({
    reducer:persistedReducer
})
export default store
export let persistor = persistStore(store)