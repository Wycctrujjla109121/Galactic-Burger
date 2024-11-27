import { configureStore } from "@reduxjs/toolkit";
import ingridientsSlice from "./ingridients/ingridients-slice";
import userSlice from "./user/user-slice";
import { useDispatch } from "react-redux";
import webSocketSlice from "./ws/ws.slice";

export const store = configureStore({
    reducer: {
        ingridients: ingridientsSlice,
        user: userSlice,
        webSocket: webSocketSlice
    },
})

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch

 export const useAppDispatch: () => AppDispatch = useDispatch
