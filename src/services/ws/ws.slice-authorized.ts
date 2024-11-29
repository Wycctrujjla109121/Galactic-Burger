import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_URL, API_Websocket_URL } from "../../constants";
import { IOrdersIngridients, IWebSocketResponse } from "../../types/websocket.type";
import { request } from "../../utils/request";

interface InitialStateType {
    webSocket: IWebSocketResponse
    isConnection: boolean;
    isError: boolean;
    isLoading: boolean;
    socket: WebSocket | null;
    order: IOrdersIngridients | null
}

const initialState: InitialStateType = {
    webSocket: {
        success: false,
        orders: null,
        total: 0,
        totalToday: 0,
    },
    isConnection: false,
    isError: false,
    isLoading: false,
    socket: null,
    order: null
};

export const webSocketAuthorized = createAsyncThunk(
    'webSocketAuthorized',
    async (_, { dispatch }) => {
        const socket = new WebSocket(`${API_Websocket_URL}/orders?token=${localStorage.getItem('accessToken')}`);

        socket.onopen = () => {
            dispatch(webSocketSliceAuthorized.actions.reducerConnectionOpened());
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            dispatch(webSocketSliceAuthorized.actions.reducerMessage(data));
        };

        socket.onclose = () => {
            dispatch(webSocketSliceAuthorized.actions.reducerConnectionClosed());
        };

        socket.onerror = () => {
            dispatch(webSocketSliceAuthorized.actions.reducerConnectionError());
        };

        return socket;
    }
);

export const fetchOrderByIdAuthorized = createAsyncThunk(
    'fetchOrderById',
    async(orderId: string) => {
        const data = await request(`${API_URL}/orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})

        return data.orders[0]
    } 
)

export const webSocketSliceAuthorized = createSlice({
    name: 'webSocketAuthorized',
    initialState: initialState,
    reducers: {
        reducerConnectionOpened: (state) => {
            state.isConnection = true;
            state.isError = false;
        },
        reducerMessage: (state: InitialStateType, action: PayloadAction<IWebSocketResponse>) => {
            state.webSocket = action.payload
        },
        reducerConnectionClosed: (state) => {
            state.isConnection = false;
            state.socket = null;
        },
        reducerConnectionError: (state) => {
            state.isError = true;
            state.isConnection = false;
            state.socket = null;
        },
        reducerRemoveIngridientById: (state: InitialStateType) => {
            state.order = null
        },
        reducerSocketCloseAuthorized: (state: InitialStateType) => {
            if (state.socket) {
                state.socket.close();
                state.socket = null;
            }
        }
    },
    selectors: {
        selectSocketAuthorized: (state) => state.webSocket,
        selectOrdersSocketAuthorized: (state) => state.webSocket.orders,
        selectOdrerByIdAuthorized: (state) => state.order,
        selectIsLoadingAuthorized: (state) => state.isLoading,
    },
    extraReducers: (builder) => {
        builder.addCase(webSocketAuthorized.pending, (state: InitialStateType) => {
            state.isLoading = true;
        });
        builder.addCase(webSocketAuthorized.fulfilled, (state: InitialStateType) => {
            state.isLoading = false;
        });
        builder.addCase(webSocketAuthorized.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(fetchOrderByIdAuthorized.pending, (state: InitialStateType) => {
            state.isLoading = true;
            state.order = null
        })
        builder.addCase(fetchOrderByIdAuthorized.fulfilled, (state: InitialStateType, action: PayloadAction<IOrdersIngridients>) => {
            state.isLoading = false
            state.order = action.payload
        })
        builder.addCase(fetchOrderByIdAuthorized.rejected, (state: InitialStateType) => {
            state.isLoading = false
            state.isError = true
            state.order = null
        })
    }
});

export default webSocketSliceAuthorized.reducer;

export const { reducerRemoveIngridientById, reducerSocketCloseAuthorized } = webSocketSliceAuthorized.actions;

export const { selectSocketAuthorized, selectOrdersSocketAuthorized, selectOdrerByIdAuthorized, selectIsLoadingAuthorized } = webSocketSliceAuthorized.selectors
