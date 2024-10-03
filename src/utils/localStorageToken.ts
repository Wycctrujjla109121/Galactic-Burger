export const addLocalStorageToken = (accessToken:string, refreshToken:string) => {
    localStorage.setItem('accessToken', accessToken.replace('Bearer ', ''))
    localStorage.setItem('refreshToken', refreshToken)
}
