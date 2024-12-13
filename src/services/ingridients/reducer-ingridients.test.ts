import { ConstructorIngridientsType, IngridientsType, OrderType } from "../../types/ingridients-type";
import {
    addBunIngridient,
    addIngridient,
    addMutableConstructorIngridient,
    addSelectIngridient,
    changeNavigationMenuType,
    fetchIngridients,
    ingridientsSlice,
    initialState,
    initialStateType,
    postOrder,
    removeIngridient,
    removeOrderDetailAndConstructorIngridient,
    removeSelectIngridient
} from "./ingridients-slice";

const ingredient:IngridientsType = {
    _id: 'test',
    name: 'test',
    type: 'test',
    proteins: 123,
    fat: 123,
    carbohydrates: 123,
    calories: 123,
    price: 123,
    image: 'test',
    image_mobile: 'test',
    image_large: 'test',
    __v: 123
}

describe('Ingridient', () => {
    it('Проверка корректность initialState', () => {
        expect(ingridientsSlice.reducer(undefined, {type: ''})).toEqual(initialState)
    })

    it('Проверка на получение ингридиентов', () => {
        const ingridients:IngridientsType[] = [
            {...ingredient},
            {...ingredient}
        ];

        const expectedState:initialStateType = {
            ...initialState,
            ingridients: ingridients,
            isLoading: false,
        };

        // Провекра pending
        expect(ingridientsSlice.reducer(undefined, {type: fetchIngridients.pending.type, payload: ingridients})).toEqual({...initialState, isLoading: true});
        // Провекра fullfilled
        expect(ingridientsSlice.reducer(undefined, {type: fetchIngridients.fulfilled.type, payload: ingridients})).toEqual(expectedState);
        // Провекра reject
        expect(ingridientsSlice.reducer(undefined, {type: fetchIngridients.rejected.type, payload: undefined})).toEqual({...initialState, isError: true});
    });

    it('Проверка на создание заказа', () => {
        const order:OrderType = {
            name: 'testOrder',
            order: {
                number: 123
            },
            success: true
        }

        const expectedState:initialStateType = {
            ...initialState,
            order: order
        };

        // Провекра pending
        expect(ingridientsSlice.reducer(undefined, {type: postOrder.pending.type, payload: order})).toEqual({...initialState, isLoading: true})
        // Провекра fullfilled
        expect(ingridientsSlice.reducer(undefined, {type: postOrder.fulfilled.type, payload: order})).toEqual(expectedState)
        // Провекра reject
        expect(ingridientsSlice.reducer(undefined, {type: postOrder.rejected.type, payload: order})).toEqual({...initialState, isError: true})
    })

    it('Проверка на добавление ингридиента', () => {
        const newIngridient:ConstructorIngridientsType = {
            ...ingredient,
            uniqId: 'test',
        };

        expect(ingridientsSlice.reducer(undefined, {type: addIngridient.type, payload: newIngridient})).toEqual({...initialState, constructorIngridients: [newIngridient]})
    })

    it('Проверка на добавление булки', () => {
        const newBunIngridient:IngridientsType = {...ingredient}

        expect(ingridientsSlice.reducer(undefined, {type: addBunIngridient.type, payload: newBunIngridient})).toEqual({...initialState, ingridientBun: newBunIngridient})
    })

    it('Проверка на удаление ингридиента', () => {
        const firstIngridient:ConstructorIngridientsType = {
            ...ingredient,
            uniqId: 'first',
        }
        const twoIngridient:ConstructorIngridientsType = {
            ...ingredient,
            uniqId: 'two',
        }

        // Удаляем из стейта ингридиент
        const removeIngridientAction = removeIngridient(firstIngridient)
        const newState = ingridientsSlice.reducer({...initialState, constructorIngridients: [firstIngridient, twoIngridient]}, removeIngridientAction)
        // Проверяем что ингридиент удалился
        expect(newState).toEqual({...initialState, constructorIngridients: [twoIngridient]})
    })

    it('Добавление выбранного ингридиента', () => {
        const selectIngridient:IngridientsType = {...ingredient}

        expect(ingridientsSlice.reducer(undefined, {type: addSelectIngridient.type, payload: selectIngridient})).toEqual({...initialState, selectedIngridient: selectIngridient})
    })

    it('Удаление выбранного ингридиента', () => {
        const selectIngridient:ConstructorIngridientsType = {
            ...ingredient,
            uniqId: 'first',
        }

        let newState = ingridientsSlice.reducer(undefined, {type: addSelectIngridient.type, payload: selectIngridient})
        expect(newState).toEqual({...initialState, selectedIngridient: selectIngridient})
        newState = ingridientsSlice.reducer(undefined, {type: removeSelectIngridient.type, payload: selectIngridient})
        expect(newState).toEqual({...initialState, selectedIngridient: null})
    })

    it('Проверка мутации ингридиента', () => {
        const ingredients:ConstructorIngridientsType[] = [
            {
                ...ingredient,
                uniqId: 'first',
            },
            {
                ...ingredient,
                uniqId: 'first',
            },
        ]

        const action = addMutableConstructorIngridient(ingredients)

        const newState = ingridientsSlice.reducer(initialState, action)

        expect(newState.constructorIngridients).toEqual(ingredients)
    });

    it('Удаление деталей заказа и конструктора ингридиента', () => {
        const newInitialState:initialStateType = {
            ...initialState,
            order: {
                name: 'test',
                order: {
                    number: 1
                },
                success: true
            },
            constructorIngridients: [
                {
                    ...ingredient,
                    uniqId: 'ingridient',
                }
            ],
            ingridientBun: {
                ...ingredient,
            }
        }

        expect(ingridientsSlice.reducer(newInitialState, {type: removeOrderDetailAndConstructorIngridient.type})).toEqual(initialState)
    })

    it('Проверка изменение навигационного меню', () => {
        const newState:initialStateType = {...initialState, navigationMenuType: 'bun'}

        expect(ingridientsSlice.reducer(newState, {type: changeNavigationMenuType.type, payload: 'gray'})).toEqual({...initialState, navigationMenuType: 'gray'})
    })
})
