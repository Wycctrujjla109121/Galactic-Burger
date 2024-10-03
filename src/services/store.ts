import { configureStore } from "@reduxjs/toolkit";
import ingridientsSlice from "./ingridients/ingridients-slice";
import userSlice from "./user/user-slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        ingridients: ingridientsSlice,
        user: userSlice
    },
})

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch

 export const useAppDispatch: () => AppDispatch = useDispatch
