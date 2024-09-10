import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { API_URL } from "../../constants"
import { IngridientsType } from "../../types/ingridients-type"

export interface initialStateType {
    ingridients: IngridientsType[],
    isLoading: boolean,
    isError: boolean,
    constructorIngridients: IngridientsType[],
    ingridientBun: IngridientsType | null,
    price: number
}

const initialState:initialStateType = {
    ingridients: [],
    isLoading: false,
    isError: false,
    constructorIngridients: [],
    ingridientBun: null,
    price: 0
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
    reducers: {
      addIngridient: (state: initialStateType, action: PayloadAction<IngridientsType>) => {
        state.constructorIngridients.push(action.payload)
      },
      addBunIngridient: (state:initialStateType, action: PayloadAction<IngridientsType>) => {
        state.ingridientBun = action.payload
      },
      removeIngridient: (state:initialStateType, action: PayloadAction<IngridientsType>) => {
        console.log(action.payload)
        state.constructorIngridients = state.constructorIngridients.filter(ingridient => action.payload._id !== ingridient._id)
      }
    },
    selectors: {
        selectIngridients: state => state.ingridients,
        selectConstructorIngridients: state => state.constructorIngridients,
        selectIngridientBun: state => state.ingridientBun,
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

export const { addIngridient, addBunIngridient, removeIngridient } = ingridientsSlice.actions
export const { selectIngridients, selectConstructorIngridients, selectIngridientBun } = ingridientsSlice.selectors
