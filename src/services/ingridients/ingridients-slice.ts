import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { API_URL } from "../../constants"
import { IngridientsType } from "../../types/ingridients-type"

export interface initialStateType {
    ingridients : IngridientsType[],
    isLoading: boolean,
    isError: boolean
}

const initialState:initialStateType = {
    ingridients: [],
    isLoading: false,
    isError: false
}

export const fetchIngridients = createAsyncThunk(
    'fetchIngridients',
    async function  () {
        const res = await fetch(API_URL, {method: 'GET'})

        const data = await res.json()

        return data.data
    }
)

export const ingridientsSlice = createSlice({
    name: 'ingridients',
    initialState: initialState,
    reducers: {},
    selectors: {
        selectIngridients: state => state.ingridients
    },
    extraReducers: (builder) => {
      builder.addCase(fetchIngridients.pending, (state: initialStateType) => {
        state.isLoading = true;
      })
      builder.addCase(fetchIngridients.fulfilled, (state: initialStateType, action: PayloadAction<IngridientsType[]>) => {
        state.isLoading = false;
        state.ingridients = action.payload;
      })
      builder.addCase(fetchIngridients.rejected, (state: initialStateType) => {
        state.isLoading = false;
        state.isError = true;
      })
    }
});

export default ingridientsSlice.reducer
export const { selectIngridients } = ingridientsSlice.selectors
