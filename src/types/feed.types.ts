import { IngridientsType } from "./ingridients-type"

export interface CardOrderType {
    name: string
    orderNumber: string
    date: string
    price: number
    ingridients: IngridientsType[] | []
}
