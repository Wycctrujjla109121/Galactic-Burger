import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { IngridientsType } from "../../../types/ingridients-type"

import { useState } from "react"
import { useDrag } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import { addSelectIngridient, selectConstructorIngridients, selectIngridient, selectIngridientBun, selectIngridients } from "../../../services/ingridients/ingridients-slice"
import { Modal } from "../../modal"
import { IngridientDetails } from "../ingridient-details"
import s from './ingridients-list.module.scss'

export const IngridientsList = ({ choiseName }: { choiseName: string[] }) => {

    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()
    const ingridients = useSelector(selectIngridients)
    const ingridientsConstructor = useSelector(selectConstructorIngridients)
    const ingridientBun = useSelector(selectIngridientBun)
    const currentSelectIngridient = useSelector(selectIngridient)

    const handleModalOpen = (item: IngridientsType) => {
        setIsOpen(true)

        dispatch(addSelectIngridient(item))
    }

    const countingQuantity = (item: IngridientsType) => {
        if (item.type === 'bun' && ingridientBun && item._id === ingridientBun._id) {
            return <Counter count={2} />
        } else if (ingridientsConstructor && ingridientsConstructor.find(i => i._id === item._id)) {
            return <Counter count={ingridientsConstructor.filter(i => i._id === item._id).length} />
        } else {
            return null
        }
    }

    const DraggableIngridient = ({ item }: { item: IngridientsType }) => {
        const [{ isOpacity }, drag] = useDrag(() => ({
            type: 'ingridients',
            item: item,
            collect: monitor => ({
                isOpacity: monitor.isDragging() ? .5 : 1
            })
        }))

        return (
            <div key={item._id} ref={drag} style={{ opacity: isOpacity }} onClick={() => handleModalOpen(item)} className={`ml-4 ${s.ingridient}`}>
                <img className='ml-4 mr-4' src={item.image} alt={item.name} />
                <div className={`mt-1 mb-1 ${s.ingridient__price}`}>
                    <p className='text text_type_digits-default'>{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className='text text_type_main-default' style={{ minHeight: '48px', width: '100%', textAlign: 'center' }}>Краторная булка N-200i</p>
                {
                    countingQuantity(item)
                }
            </div>
        )
    }

    return (
        <div className={s.wrapper}>
            {currentSelectIngridient &&
                <Modal withTitle isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
                    <IngridientDetails />
                </Modal>
            }
            {
                currentSelectIngridient && <div>Выбран ингридиент</div>
            }
            {
                choiseName.map(type => (
                    <div key={type} className='mt-10'>
                        <p className="text text_type_main-large mb-6">
                            {type}
                        </p>
                        <div className={s.ingridient__list}>
                            {
                                ingridients.filter(ingridient => ingridient.type === type).map(item => (
                                    <DraggableIngridient key={item._id} item={item} />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
