import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistStore,persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import authReducer from './Slice/AuthSlice';
import postReducer from './Slice/PostSlice';
import AdminReducer from '../../Admin/slice/Adminslice';
import AdminAuthReducer  from '../../Admin/slice/Authadmin';

const reducers = combineReducers({
    auth: authReducer,
    post:postReducer,
    admin:AdminReducer,
    adminauth:AdminAuthReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','adminauth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});


const persistor = persistStore(store)

export {store, persistor};
// export default store;









// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './Slice/AuthSlice';
// import postReducer from './Slice/PostSlice';
// import { persistStore, persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['auth','upload']
// }

// const persistedReducer = persistCombineReducers(persistConfig, {
//     auth: authReducer,
//     upload:postReducer,
// })

// const store = configureStore({
//     reducer: persistedReducer,
//   });

// const persistor = persistStore(store)

// export {store, persistor};




// export const store =configureStore({
//     reducer:{
//         auth:authReducer,
//     },
// })


