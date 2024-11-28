import { IOrderStatus } from "./websocket.type"

export interface CardOrderType {
    name: string
    orderNumber: number
    date: string
    ingridients: string[]
    status: IOrderStatus
}
