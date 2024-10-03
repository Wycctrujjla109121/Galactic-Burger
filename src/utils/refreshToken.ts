import { API_URL } from "../constants"
import { checkResponse } from "./check-response"

export const refreshToken = () => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('refreshToken')}`
        },
        body: JSON.stringify({
            "token": localStorage.getItem("refreshToken")
        })
    }

    return fetch(`${API_URL}/auth/token`, options)
    .then(checkResponse)
    .catch(error => error)
}
