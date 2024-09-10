import { configureStore } from "@reduxjs/toolkit";
import ingridientsSlice from "./ingridients/ingridients-slice";

export const store = configureStore({
    reducer: {
        ingridients: ingridientsSlice
    }
})


 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch
