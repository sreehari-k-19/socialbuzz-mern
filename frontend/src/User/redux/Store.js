import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slice/AuthSlice';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const persistedReducer = persistCombineReducers(persistConfig, {
    auth: authReducer,
})

const store = configureStore({
    reducer: persistedReducer,
  });

const persistor = persistStore(store)

export {store, persistor};












// export const store =configureStore({
//     reducer:{
//         auth:authReducer,
//     },
// })


