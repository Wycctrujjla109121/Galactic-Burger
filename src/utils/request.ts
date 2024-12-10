import { checkResponse } from "./check-response";
import { refreshToken } from "./refreshToken";

export async function request(url: string, options: RequestInit): Promise<any>{
    const response = await (await fetch(url, options)).json()

    if (response.message === 'jwt expired' || response.message === 'Invalid or missing token'){
        const resToken = await refreshToken()

        localStorage.setItem('accessToken', resToken.accessToken.replace(`Bearer `, ''))
        localStorage.setItem('refreshToken', resToken.refreshToken)

        const newOptions = {...options, headers: {...options.headers, 'Authorization': resToken.accessToken}}

        return fetch(url, newOptions).then(checkResponse)
    }

    return response
}
