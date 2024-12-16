import { AuthResponceType, ResponceUserType } from "../../types/auth.types"
import { forgotPassword, getUserInfo, initialState, logout, reducerAuthChecker, registration, resetPassword, signIn, updateUserInfo, userSlice } from "./user-slice"

describe('user', () => {

    it('Проверка корректность initialState', () => {
        expect(userSlice.reducer(undefined, {type: ''})).toEqual(initialState)
    })

    it('Проверка авторизации', () => {
        const responceUser: AuthResponceType = {
            success: true,
            user: {
              email: 'testEmailUser',
              name: 'testUserName'
            },
            accessToken: 'dfghdkjg',
            refreshToken: 'dfjkghsdkg'
        }

        expect(userSlice.reducer(undefined, {type: signIn.pending.type, payload: responceUser})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: signIn.fulfilled.type, payload: responceUser})).toEqual({...initialState, user: responceUser.user})
        expect(userSlice.reducer(undefined, {type: signIn.rejected.type, payload: responceUser})).toEqual({...initialState, isLoading: false, isError: true})
    })

    it('Проверка регистрации', () => {
        const responceUser: AuthResponceType = {
            success: true,
            user: {
              email: 'testEmailUser',
              name: 'testUserName'
            },
            accessToken: 'dfghdkjg',
            refreshToken: 'dfjkghsdkg'
        }

        expect(userSlice.reducer(undefined, {type: registration.pending.type, payload: responceUser})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: registration.fulfilled.type, payload: responceUser})).toEqual({...initialState, user: responceUser.user})
        expect(userSlice.reducer(undefined, {type: registration.rejected.type, payload: responceUser})).toEqual({...initialState, isLoading: false, isError: true})
    })

    it('Проверка на forgotPassword', () => {
        expect(userSlice.reducer(undefined, {type: forgotPassword.pending.type})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: forgotPassword.fulfilled.type})).toEqual({...initialState, isLoading: false})
        expect(userSlice.reducer(undefined, {type: forgotPassword.rejected.type})).toEqual({...initialState, isLoading: false, isError: true})
    })

    it('Проверка на resetPassword', () => {
        expect(userSlice.reducer(undefined, {type: resetPassword.pending.type})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: resetPassword.fulfilled.type})).toEqual({...initialState, isLoading: false})
        expect(userSlice.reducer(undefined, {type: resetPassword.rejected.type})).toEqual({...initialState, isLoading: false, isError: true})
    })

    it('Проверка получение getUserInfo', () => {
        const responceUser:ResponceUserType = {
            success: true,
            user: {
                email:'testEmailUser',
                name: 'testNameUser'
            }
        }

        expect(userSlice.reducer(undefined, {type: getUserInfo.pending.type})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: getUserInfo.fulfilled.type, payload: responceUser})).toEqual({...initialState, isLoading: false, isAuthChecked: true, user: responceUser.user})
        expect(userSlice.reducer(undefined, {type: getUserInfo.rejected.type})).toEqual({...initialState, isLoading: false, isError: true, isAuthChecked: true})
    })

    it('Проверка обновление пользователя updateUserInfo', () => {
        const responceUpdateUser:ResponceUserType = { 
            success: true,
            user: {
                email:'testEmailUser',
                name: 'testNameUser'
            }
        }

        expect(userSlice.reducer(undefined, {type: updateUserInfo.pending.type, payload: responceUpdateUser})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: updateUserInfo.fulfilled.type, payload: responceUpdateUser})).toEqual({...initialState, user: responceUpdateUser.user})
        expect(userSlice.reducer(undefined, {type: updateUserInfo.rejected.type, payload: responceUpdateUser})).toEqual({...initialState, isLoading: false, isError: true})
    })

    it('Проверка выход пользователя', () => {
        expect(userSlice.reducer(undefined, {type: logout.pending.type})).toEqual({...initialState, isLoading: true})
        expect(userSlice.reducer(undefined, {type: logout.fulfilled.type})).toEqual({...initialState})
        expect(userSlice.reducer(undefined, {type: logout.rejected.type})).toEqual({...initialState, isLoading: false, isError: true})
    })

    it('Проверка reducerAuthChecker', () => {
        expect(userSlice.reducer(undefined, {type: reducerAuthChecker.type, payload: true})).toEqual({...initialState, isAuthChecked: true})
    })
})
