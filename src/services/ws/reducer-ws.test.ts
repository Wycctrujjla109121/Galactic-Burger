import {
    initialState,
    webSocketSlice,
    fetchOrderById,
    reducerRemoveIngridientById,
    reducerSocketClose,
} from './ws.slice';
import { IOrdersIngridients, IWebSocketResponse } from '../../types/websocket.type';

describe('webSocketSlice', () => {
    it('Проверка initialState', () => {
        expect(webSocketSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('Проверка открытия webSocket', () => {
        // Открытие соединения
        expect(webSocketSlice.reducer(undefined, {type: webSocketSlice.actions.reducerConnectionOpened.type})).toEqual({...initialState, isConnection: true, isError: false})

        // Проверка получения сообщения по сокету
        const websocketInfo: IWebSocketResponse = {
            success: true,
            orders: [],
            total: 10,
            totalToday: 2,
        };
        expect(webSocketSlice.reducer(undefined, webSocketSlice.actions.reducerMessage(websocketInfo))).toEqual({...initialState, webSocket: websocketInfo, isLoadingSocket: false})

        // Проверка закрытия соединения
        expect(webSocketSlice.reducer(undefined, webSocketSlice.actions.reducerConnectionClosed())).toEqual({...initialState, isConnection: false, socket: null})

        // Проверка ошибки соединения
        expect(webSocketSlice.reducer(undefined, webSocketSlice.actions.reducerConnectionError())).toEqual({...initialState, isError: true, isConnection: false, socket: null, isLoadingSocket: false})

        // Проверка на закрытие сокета
        expect(webSocketSlice.reducer(undefined, reducerSocketClose())).toEqual({...initialState})
    });

    it('Проверка удаление заказа reducerRemoveIngridientById', () => {
        expect(webSocketSlice.reducer(undefined, reducerRemoveIngridientById())).toEqual({...initialState, order: null})
    });

    it('Проверка получения fetchOrderById', () => {
        const ordersIngridients: IOrdersIngridients = {
            _id: 'testId',
            ingredients: [],
            status: 'done',
            name: 'testOrder',
            createdAt: 'testCreatedAt',
            updatedAt: 'testUpdateAt',
            number: 123,
        };

        expect(webSocketSlice.reducer(undefined, {type: fetchOrderById.pending.type, payload: ordersIngridients})).toEqual({...initialState, isLoading: true})
        expect(webSocketSlice.reducer(undefined, {type: fetchOrderById.fulfilled.type, payload: ordersIngridients})).toEqual({...initialState, isLoading: false, order: ordersIngridients})
        expect(webSocketSlice.reducer(undefined, {type: fetchOrderById.rejected.type, payload: ordersIngridients})).toEqual({...initialState, isLoading: false, isError: true, order: null})
    });
});
