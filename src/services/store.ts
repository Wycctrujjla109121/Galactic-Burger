import { configureStore } from "@reduxjs/toolkit";
import ingridientsSlice from "./ingridients/ingridients-slice";
import userSlice from "./user/user-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import webSocketSlice from "./ws/ws.slice";

export const store = configureStore({
    reducer: {
        ingridients: ingridientsSlice,
        user: userSlice,
        webSocket: webSocketSlice,
    },
})

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch
 export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

 export const useAppDispatch: () => AppDispatch = useDispatch
