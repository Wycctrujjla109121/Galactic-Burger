import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../../utils/request";
import { API_URL } from "../../constants";
import { AuthResponceType, ResponceUserType } from "../../types/auth.types";
import { addLocalStorageToken } from "../../utils/localStorageToken";

interface InitialStateType{
    user: {
        email: string | null,
        name: string | null,
    }
    isLoading: boolean,
    isError: boolean,
}

const initialState:InitialStateType = {
    user:{
        email: null,
        name: null,
    },
    isLoading: false,
    isError: false,
}

export const signIn = createAsyncThunk(
    'signIn',
    async ({email, password}: {email: string, password: string}) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const data = await request(`${API_URL}/auth/login`, options)

        return data
    }
)

export const registration = createAsyncThunk(
    'registration',
    async ({name, email, password}: {name: string, email: string, password: string}) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = await request(`${API_URL}/auth/register`, options)

        return data
    }
)

export const forgotPassword = createAsyncThunk(
    'forgotPassword',
    async (email: string) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "email": email,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const data = await request(`${API_URL}/password-reset`, options)

        return data
    }
)

export const resetPassword = createAsyncThunk(
    'resetPassword',
    async ({password, token}: {password: string, token: string}) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "password": password,
                "token": token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const data = await request(`${API_URL}/password-reset/reset`, options)

        return data
    }
)

export const getUserInfo = createAsyncThunk(
    'getUserInfo',
    async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        }

        const data = await request(`${API_URL}/auth/user`, options)

        return data
    }
)

export const updateUserInfo = createAsyncThunk(
    'updateUserInfo',
    async ({name, email, password}: {name: string, email: string, password?: string}) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password ?? null
            })
        }

        const data = request(`${API_URL}/auth/user`, options)

        return data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    selectors:{
        selectUser: (state) => state.user,
        selectIsLoading: (state) => state.isLoading,
        selectError: (state) => state.isError,
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state: InitialStateType) => {
            state.isLoading = true
        })
        builder.addCase(signIn.fulfilled, (state: InitialStateType, action:PayloadAction<AuthResponceType>) => {
            state.isLoading = false
            state.user = action.payload.user

            addLocalStorageToken(action.payload.accessToken, action.payload.refreshToken)
        })
        builder.addCase(signIn.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        })

        builder.addCase(registration.pending, (state: InitialStateType) => {
            state.isLoading = true
        })
        builder.addCase(registration.fulfilled, (state: InitialStateType, action:PayloadAction<AuthResponceType>) => {
            state.isLoading = false
            state.user = action.payload.user

            addLocalStorageToken(action.payload.accessToken, action.payload.refreshToken)
        })
        builder.addCase(registration.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        })

        builder.addCase(forgotPassword.pending, (state: InitialStateType) => {
            state.isLoading = true
        })
        builder.addCase(forgotPassword.fulfilled, (state: InitialStateType) => {
            state.isLoading = false
            localStorage.setItem('resetPassword', 'true')
        })
        builder.addCase(forgotPassword.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        })

        builder.addCase(resetPassword.pending, (state: InitialStateType) => {
            state.isLoading = true
        })
        builder.addCase(resetPassword.fulfilled, (state: InitialStateType) => {
            state.isLoading = false

            localStorage.removeItem('resetPassword')
        })
        builder.addCase(resetPassword.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        })

        builder.addCase(getUserInfo.pending, (state: InitialStateType) => {
            state.isLoading = true
        })
        builder.addCase(getUserInfo.fulfilled, (state: InitialStateType, action:PayloadAction<ResponceUserType>) => {
            state.isLoading = false
            state.user = action.payload.user
        })
        builder.addCase(getUserInfo.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        })

        builder.addCase(updateUserInfo.pending, (state: InitialStateType) => {
            state.isLoading = true
        })
        builder.addCase(updateUserInfo.fulfilled, (state: InitialStateType, action:PayloadAction<ResponceUserType>) => {
            state.isLoading = false
            state.user = action.payload.user
        })
        builder.addCase(updateUserInfo.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        })
    }

})

export default userSlice.reducer

export const { selectUser, selectIsLoading, selectError } = userSlice.selectors 
