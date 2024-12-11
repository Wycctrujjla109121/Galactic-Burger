import { useReducer } from "react"
import { forgotPassword, getUserInfo, initialState, logout, reducerAuthChecker, registration, resetPassword, signIn, updateUserInfo, userSlice } from "./user-slice"

describe('user', () => {

    it('Проверка корректность initialState', () => {
        expect(userSlice.reducer(undefined, {type: ''})).toEqual(initialState)
    })

    it('Проверка авторизации', () => {
        const userInfo = {
            email: 'test@mail.ru',
            password: 'testPassword',
            user: 'testUserOk'
        }

        expect(userSlice.reducer(undefined, {type: signIn.pending.type, payload: userInfo})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: signIn.fulfilled.type, payload: userInfo})).toEqual({...initialState, user: userInfo.user})
        expect(userSlice.reducer(undefined, {type: signIn.rejected.type, payload: userInfo})).toEqual({...initialState, isLoading: false, isError: true})
    })

    it('Проверка регистрации', () => {
        const userInfo = {
            name: 'testName',
            email: 'testEmail',
            password: 'testPassword',
            user: 'userRegistrationOk',
        }

        expect(userSlice.reducer(undefined, {type: registration.pending.type, payload: userInfo})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: registration.fulfilled.type, payload: userInfo})).toEqual({...initialState, user: userInfo.user})
        expect(userSlice.reducer(undefined, {type: registration.rejected.type, payload: userInfo})).toEqual({...initialState, isLoading: false, isError: true})
    })

    it('Проверка на forgotPassword', () => {
        const userInfo = {
            email: 'testEmail'
        }

        expect(userSlice.reducer(undefined, {type: forgotPassword.pending.type, payload: userInfo})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: forgotPassword.fulfilled.type, payload: userInfo})).toEqual({...initialState, isLoading: false})
        expect(userSlice.reducer(undefined, {type: forgotPassword.rejected.type, payload: userInfo})).toEqual({...initialState, isLoading: false, isError: true})
    })

    it('Проверка на resetPassword', () => {
        const userInfo = {
            password: 'testPassword',
            token: 'testToken',
        }

        expect(userSlice.reducer(undefined, {type: resetPassword.pending.type, payload: userInfo})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: resetPassword.fulfilled.type, payload: userInfo})).toEqual({...initialState, isLoading: false})
        expect(userSlice.reducer(undefined, {type: resetPassword.rejected.type, payload: userInfo})).toEqual({...initialState, isLoading: false, isError: true})
    })

    it('Проверка получение getUserInfo', () => {
        expect(userSlice.reducer(undefined, {type: getUserInfo.pending.type})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: getUserInfo.fulfilled.type, payload: {user: 'userOk'}})).toEqual({...initialState, isLoading: false, isAuthChecked: true, user: 'userOk'})
        expect(userSlice.reducer(undefined, {type: getUserInfo.rejected.type})).toEqual({...initialState, isLoading: false, isError: true, isAuthChecked: true})
    })

    it('Проверка обновление пользователя updateUserInfo', () => {
        const updateUser = { 
            name: 'testName',
            email: 'testEmail',
            password: 'testPassword',
            user: 'testUserOk',
        }

        expect(userSlice.reducer(undefined, {type: updateUserInfo.pending.type, payload: updateUser})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: updateUserInfo.fulfilled.type, payload: updateUser})).toEqual({...initialState, user: updateUser.user})
        expect(userSlice.reducer(undefined, {type: updateUserInfo.rejected.type, payload: updateUser})).toEqual({...initialState, isLoading: false, isError: true})
    })

    it('Проверка выход пользователя', () => {
        expect(userSlice.reducer(undefined, {type: logout.pending.type})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: logout.fulfilled.type})).toEqual({...initialState})
        expect(userSlice.reducer(undefined, {type: logout.rejected.type})).toEqual({...initialState, isLoading: false, isError: true})
    })

    it('Проверка reducerAuthChecker', () => {
        const authChecked = 'checkedOk'

        expect(userSlice.reducer(undefined, {type: reducerAuthChecker.type, payload: authChecked})).toEqual({...initialState, isAuthChecked: authChecked})
    })
})
