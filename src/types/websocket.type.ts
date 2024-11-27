import { IngridientsType } from "./ingridients-type"

export interface IWebSocketResponse {
    success: boolean,
    orders: IOrders[] | null
    total: number,
    totalToday: number,
}

export interface IOrdersIngridients {
    ingredients: IngridientsType[] | null,
    _id: string,
    status: IOrderStatus,
    name: string,
    number: number,
    createdAt: string,
    updatedAt: string
}

export interface IOrders {
    ingredients: string[],
    _id: string,
    status: IOrderStatus,
    name: string,
    number: number,
    createdAt: string,
    updatedAt: string
}

export type IOrderStatus = 'done'| 'create' | 'pending'
