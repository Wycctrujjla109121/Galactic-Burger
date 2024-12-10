import { IOrderStatus } from "./websocket.type"

export interface CardOrderType {
    name: string
    orderNumber: number
    date: Date
    ingridients: string[]
    status: IOrderStatus
}
