import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { API_URL, API_URL_ORDER } from "../../constants"
import { ConstructorIngridientsType, IngridientsType, OrderType } from "../../types/ingridients-type"

export interface initialStateType {
    ingridients: IngridientsType[],
    isLoading: boolean,
    isError: boolean,
    constructorIngridients: ConstructorIngridientsType[],
    ingridientBun: IngridientsType | null,
    price: number,
    selectedIngridient: IngridientsType | null,
    order: OrderType | null
    navigationMenuType: string
}

const initialState:initialStateType = {
    ingridients: [],
    isLoading: false,
    isError: false,
    constructorIngridients: [],
    ingridientBun: null,
    price: 0,
    selectedIngridient: null,
    order: null,
    navigationMenuType: 'bun'
}

export const fetchIngridients = createAsyncThunk(
    'fetchIngridients',
    async function  () {
        const res = await fetch(API_URL, {method: 'GET'})

        const data = await res.json()

        return data.data
    }
)

export const postOrder = createAsyncThunk(
  'postOrder',
  async (ingridients: string[]) => {
    const res = await fetch(API_URL_ORDER, {
      method: 'POST',
      body: JSON.stringify({
        "ingredients": ingridients
      }),
      headers: { 
        'Content-Type': 'application/json'
      },
    })

    const data = await res.json()

    return data
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
      removeSelectIngridient: (state: initialStateType) => {
        state.selectedIngridient = null
      },
      addMutableConstructorIngridient: (state:initialStateType, action: PayloadAction<ConstructorIngridientsType[]>) => {
        state.constructorIngridients = action.payload
      },
      removeOrderDetailAndConstructorIngridient: (state: initialStateType) =>{
        state.order = null
        state.constructorIngridients = []
        state.ingridientBun = null
      },
      changeNavigationMenuType: (state: initialStateType, action: PayloadAction<string>) => {
        state.navigationMenuType = action.payload
      }
    },
    selectors: {
        selectIngridients: state => state.ingridients,
        selectConstructorIngridients: state => state.constructorIngridients,
        selectIngridientBun: state => state.ingridientBun,
        selectIngridient: state => state.selectedIngridient,
        selectOrderDetails: state => state.order,
        selectNavigationMenuType: state => state.navigationMenuType
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
      
      builder.addCase(postOrder.pending, (state: initialStateType) => {
        state.isLoading = true;
      })
      builder.addCase(postOrder.fulfilled, (state: initialStateType, action: PayloadAction<OrderType>) => {
        state.isLoading = false
        state.order = action.payload
      })
      builder.addCase(postOrder.rejected, (state: initialStateType) => {
        state.isLoading = false
        state.isError = true
      })
    }
});

export default ingridientsSlice.reducer

export const {
  addIngridient,
  addBunIngridient,
  removeIngridient, 
  addSelectIngridient, 
  removeSelectIngridient,
  addMutableConstructorIngridient,
  removeOrderDetailAndConstructorIngridient,
  changeNavigationMenuType
} = ingridientsSlice.actions

export const { 
  selectIngridients,
  selectConstructorIngridients,
  selectIngridientBun,
  selectIngridient,
  selectOrderDetails,
  selectNavigationMenuType
} = ingridientsSlice.selectors
