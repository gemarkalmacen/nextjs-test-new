
import { configureStore } from "@reduxjs/toolkit";
// import counterSlice from "./features/users/counterSlice";
// import todoReducer from "./features/todo/todoSlice";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";

// import {
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// import { encryptTransform } from 'redux-persist-transform-encrypt'; 

// import invoiceReducer from './features/invoice/invoiceSlice'
// import  sidebarSlice  from "./features/sidebar/sidebarSlice";
// import sidemenuSlice from "./features/sidemenu/sidemenuSlice"
// import registerSlice from "./features/register/registerSlice";
// import profileSlice from "./features/profile/profileSlice";
// import settingsSlice from "./features/settings/settingsSlice"


const secretKey = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || "";
// const persistConfig = {
//   key: "root",
//   storage,
//   // whitelist: ["user", "token", "profile"],
//   transforms: [
//     encryptTransform({
//       secretKey,
//       onError: function (error: any) {
//         console.error("Encryption error:", error);
//       }
//     }),
//   ],
// };

// const persistedReducer = persistReducer(persistConfig, loginSlice);

import loginSlice from "./features/loginSlice"

export const store = configureStore({
  reducer: {
    //     counter: counterSlice,
    //     invoice: invoiceReducer,
    //     sidebar: sidebarSlice,
    //     todo: todoReducer,
    //     sidemenu: sidemenuSlice,
    //     register: registerSlice,
    // profile: profileSlice,
    // settings: settingsSlice,
        // auth: persistedReducer,
        auth: loginSlice,
      },
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware({
    //       serializableCheck: {
    //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //       },
    //     })
});

// export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;