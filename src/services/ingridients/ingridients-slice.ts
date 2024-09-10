import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { API_URL } from "../../constants"
import { ConstructorIngridientsType, IngridientsType } from "../../types/ingridients-type"

export interface initialStateType {
    ingridients: IngridientsType[],
    isLoading: boolean,
    isError: boolean,
    constructorIngridients: ConstructorIngridientsType[],
    ingridientBun: IngridientsType | null,
    price: number,
    selectedIngridient: IngridientsType | null
}

const initialState:initialStateType = {
    ingridients: [],
    isLoading: false,
    isError: false,
    constructorIngridients: [],
    ingridientBun: null,
    price: 0,
    selectedIngridient: null
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
      addIngridient: (state: initialStateType, action: PayloadAction<ConstructorIngridientsType>) => {
        state.constructorIngridients.push(action.payload)
      },
      addBunIngridient: (state:initialStateType, action: PayloadAction<IngridientsType>) => {
        state.ingridientBun = action.payload
      },
      removeIngridient: (state:initialStateType, action: PayloadAction<ConstructorIngridientsType>) => {
        state.constructorIngridients = state.constructorIngridients.filter(ingridient => action.payload.uniqId !== ingridient.uniqId)
      },
      addSelectIngridient: (state:initialStateType, action: PayloadAction<IngridientsType>) => {
        state.selectedIngridient = action.payload
      },
      removeSelectIngridient: (state: initialStateType)=> {
        state.selectedIngridient = null
      }
    },
    selectors: {
        selectIngridients: state => state.ingridients,
        selectConstructorIngridients: state => state.constructorIngridients,
        selectIngridientBun: state => state.ingridientBun,
        selectIngridient: state => state.selectedIngridient
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

export const { addIngridient, addBunIngridient, removeIngridient, addSelectIngridient, removeSelectIngridient } = ingridientsSlice.actions
export const { selectIngridients, selectConstructorIngridients, selectIngridientBun, selectIngridient } = ingridientsSlice.selectors
