/*import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key:'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)



const store = configureStore({
    reducer:{
       auth: persistedReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Export AppDispatch
export const persistor  = persistStore(store);
export default store;*/

/*import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

const store = configureStore({
    reducer: rootReducer,
})

export default store*/