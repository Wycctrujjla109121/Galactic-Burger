import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import { IOrdersIngridients, IWebSocketResponse } from "../../types/websocket.type";
import { request } from "../../utils/request";

interface InitialStateType {
    webSocket: IWebSocketResponse
    isConnection: boolean;
    isError: boolean;
    isLoading: boolean;
    socket: WebSocket | null;
    order: IOrdersIngridients | null;
    isLoadingSocket: boolean;
}

const initialState: InitialStateType | null = {
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
    order: null,
    isLoadingSocket: true,
};

export const webSocket = createAsyncThunk(
    'websocket',
    async ({ url }: {url: string}, { dispatch }) => {
        const socket = new WebSocket(url);
        socket.onopen = () => {
            dispatch(webSocketSlice.actions.reducerConnectionOpened());
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            dispatch(webSocketSlice.actions.reducerMessage(data));
        };

        socket.onclose = () => {
            dispatch(webSocketSlice.actions.reducerConnectionClosed());
        };

        socket.onerror = () => {
            dispatch(webSocketSlice.actions.reducerConnectionError());
        };

        return socket;
    }
);

export const fetchOrderById = createAsyncThunk(
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

export const webSocketSlice = createSlice({
    name: 'webSocket',
    initialState: initialState,
    reducers: {
        reducerConnectionOpened: (state) => {
            state.isConnection = true;
            state.isError = false;
        },
        reducerMessage: (state: InitialStateType, action: PayloadAction<IWebSocketResponse>) => {
            state.webSocket = action.payload
            state.isLoadingSocket = false
        },
        reducerConnectionClosed: (state) => {
            state.isConnection = false;
            state.socket = null;
        },
        reducerConnectionError: (state) => {
            state.isError = true;
            state.isConnection = false;
            state.socket = null;
            state.isLoadingSocket = false
        },
        reducerRemoveIngridientById: (state: InitialStateType) => {
            state.order = null
        },
        reducerSocketClose: (state: InitialStateType) => {
            if (state.socket) {
                state.socket.close();
                state.socket = null;
            }
            return {...initialState}
        }
    },
    selectors: {
        selectSocket: (state) => state.webSocket,
        selectOrdersSocket: (state) => state.webSocket.orders,
        selectOdrerById: (state) => state.order,
        selectIsLoading: (state) => state.isLoadingSocket
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrderById.pending, (state: InitialStateType) => {
            state.isLoading = true;
            state.order = null
        })
        builder.addCase(fetchOrderById.fulfilled, (state: InitialStateType, action: PayloadAction<IOrdersIngridients>) => {
            state.isLoading = false
            state.order = action.payload
        })
        builder.addCase(fetchOrderById.rejected, (state: InitialStateType) => {
            state.isLoading = false
            state.isError = true
            state.order = null
        })
    }
});

export default webSocketSlice.reducer;

export const { reducerRemoveIngridientById, reducerSocketClose } = webSocketSlice.actions;

export const { selectSocket, selectOrdersSocket, selectOdrerById, selectIsLoading } = webSocketSlice.selectors
