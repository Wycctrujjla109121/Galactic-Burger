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

describe('Ingridient', () => {
    it('Проверка корректность initialState', () => {
        expect(ingridientsSlice.reducer(undefined, {type: ''})).toEqual(initialState)
    })

    it('Проверка на получение ингридиентов', () => {
        const ingridients = [
            {
                id: 1,
                name: 'testIngridient-1',
            },
            {
                id: 2,
                name: 'testIngridient-2',
            }
        ];

        const expectedState = {
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
        const order = {
            name: 'testOrder',
            order: {
                number: 123
            },
            success: true
        }

        const expectedState = {
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
        const newIngridient = {
            uniqId: 'test',
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
        };

        expect(ingridientsSlice.reducer(undefined, {type: addIngridient.type, payload: newIngridient})).toEqual({...initialState, constructorIngridients: [newIngridient]})
    })

    it('Проверка на добавление булки', () => {
        const newBunIngridient = {
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

        expect(ingridientsSlice.reducer(undefined, {type: addBunIngridient.type, payload: newBunIngridient})).toEqual({...initialState, ingridientBun: newBunIngridient})
    })

    it('Проверка на удаление ингридиента', () => {
        const firstIngridient = {
            uniqId: 'first',
            _id: 'first',
            name: 'first',
            type: 'first',
            proteins: 1,
            fat: 1,
            carbohydrates: 1,
            calories: 1,
            price: 1,
            image: 'first',
            image_mobile: 'first',
            image_large: 'first',
            __v: 1
        }
        const twoIngridient = {
            uniqId: 'two',
            _id: 'two',
            name: 'two',
            type: 'two',
            proteins: 2,
            fat: 2,
            carbohydrates: 2,
            calories: 2,
            price: 2,
            image: 'two',
            image_mobile: 'two',
            image_large: 'two',
            __v: 2
        }

        // Удаляем из стейта ингридиент
        const removeIngridientAction = removeIngridient(firstIngridient)
        const newState = ingridientsSlice.reducer({...initialState, constructorIngridients: [firstIngridient, twoIngridient]}, removeIngridientAction)
        // Проверяем что ингридиент удалился
        expect(newState).toEqual({...initialState, constructorIngridients: [twoIngridient]})
    })

    it('Добавление выбранного ингридиента', () => {
        const selectIngridient = {
            uniqId: 'test',
            _id: 'test',
            name: 'test',
            type: 'test',
            proteins: 1,
            fat: 1,
            carbohydrates: 1,
            calories: 1,
            price: 1,
            image: 'test',
            image_mobile: 'test',
            image_large: 'test',
            __v: 1
        }

        expect(ingridientsSlice.reducer(undefined, {type: addSelectIngridient.type, payload: selectIngridient})).toEqual({...initialState, selectedIngridient: selectIngridient})
    })

    it('Удаление выбранного ингридиента', () => {
        const selectIngridient = {
            uniqId: 'first',
            _id: 'first',
            name: 'first',
            type: 'first',
            proteins: 1,
            fat: 1,
            carbohydrates: 1,
            calories: 1,
            price: 1,
            image: 'first',
            image_mobile: 'first',
            image_large: 'first',
            __v: 1
        }

        let newState = ingridientsSlice.reducer(undefined, {type: addSelectIngridient.type, payload: selectIngridient})
        expect(newState).toEqual({...initialState, selectedIngridient: selectIngridient})
        newState = ingridientsSlice.reducer(undefined, {type: removeSelectIngridient.type, payload: selectIngridient})
        expect(newState).toEqual({...initialState, selectedIngridient: null})
    })

    it('should add ingredients correctly', () => {
        const ingredients = [
            {
                uniqId: 'first',
                _id: 'first',
                name: 'first',
                type: 'first',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: 'first',
                image_mobile: 'first',
                image_large: 'first',
                __v: 1
            },
            {
                uniqId: 'first',
                _id: 'first',
                name: 'first',
                type: 'first',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: 'first',
                image_mobile: 'first',
                image_large: 'first',
                __v: 1
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
                    uniqId: 'ingridient',
                    _id: 'ingridient',
                    name: 'ingridient',
                    type: 'ingridient',
                    proteins: 1,
                    fat: 1,
                    carbohydrates: 1,
                    calories: 1,
                    price: 1,
                    image: 'ingridient',
                    image_mobile: 'ingridient',
                    image_large: 'ingridient',
                    __v: 1
                }
            ],
            ingridientBun: {
                _id: 'bun',
                name: 'bun',
                type: 'bun',
                proteins: 1,
                fat: 1,
                carbohydrates: 1,
                calories: 1,
                price: 1,
                image: 'bun',
                image_mobile: 'bun',
                image_large: 'bun',
                __v: 1
            }
        }

        expect(ingridientsSlice.reducer(newInitialState, {type: removeOrderDetailAndConstructorIngridient.type})).toEqual(initialState)
    })

    it('Проверка изменение навигационного меню', () => {
        const newState:initialStateType = {...initialState, navigationMenuType: 'bun'}

        expect(ingridientsSlice.reducer(newState, {type: changeNavigationMenuType.type, payload: 'gray'})).toEqual({...initialState, navigationMenuType: 'gray'})
    })
})
