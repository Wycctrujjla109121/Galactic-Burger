import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_Websocket_URL } from "../../constants";
import { IWebSocketResponse } from "../../types/websocket.type";

interface InitialStateType {
    webSocket: IWebSocketResponse
    isConnection: boolean;
    isError: boolean;
    isLoading: boolean;
    socket: WebSocket | null;
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
};

export const webSocket = createAsyncThunk(
    'websocket',
    async (_, { dispatch }) => {
        const socket = new WebSocket(`${API_Websocket_URL}/orders/all`);

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
    },
    selectors: {
        selectSocket: (state) => state.webSocket,
        selectOrdersSocket: (state) => state.webSocket.orders
    },
    extraReducers: (builder) => {
        builder.addCase(webSocket.pending, (state: InitialStateType) => {
            state.isLoading = true;
        });
        builder.addCase(webSocket.fulfilled, (state: InitialStateType) => {
            state.isLoading = false;
        });
        builder.addCase(webSocket.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export default webSocketSlice.reducer;

export const { reducerConnectionOpened, reducerMessage, reducerConnectionClosed, reducerConnectionError } = webSocketSlice.actions;

export const { selectSocket, selectOrdersSocket } = webSocketSlice.selectors
