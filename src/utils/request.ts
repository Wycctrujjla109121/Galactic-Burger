import { RequestOptions } from "https";
import { checkResponse } from "./check-response";
import { refreshToken } from "./refreshToken";

export async function request(url: string, options: RequestInit): Promise<any>{
    const responce = await (await fetch(url, options)).json()

    if (responce.message === 'jwt expired'){
        const resToken = await refreshToken()

        let newOptions: RequestOptions = Object.assign(options)

        if (resToken.accessToken && resToken.refreshToken){
                localStorage.setItem('accessToken', resToken.accessToken.replace(`Bearer `, ''))
                localStorage.setItem('refreshToken', resToken.refreshToken)
            if(newOptions.headers?.authorization){
                newOptions.headers.authorization = resToken.accessToken
            }
        }

        return fetch(url, newOptions as RequestInit).then(checkResponse)
    }

    return fetch(url, options).then(checkResponse)
}
