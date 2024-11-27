import { IOrderStatus } from "../types/websocket.type"

export const ORDER_STATUS: Record<IOrderStatus, string> = {
    done: 'Выполнен',
    create: 'Создан',
    pending: 'готовится'
}
