import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { IngridientsType } from "../../../types/ingridients-type"

import s from './ingridients-list.module.scss'
import { IngridientDetails } from "../ingridient-details"
import { useState } from "react"
import { Modal } from "../../modal"

export const IngridientsList = ({ ingridients, choiseName }: { ingridients: IngridientsType[], choiseName: string[] }) => {

    const [ingridientDetail, setIngridientDetail] = useState<IngridientsType>()
    const [isOpen, setIsOpen] = useState(false)

    const handleModalOpen = (item: IngridientsType) => {
        setIngridientDetail(item)
        setIsOpen(true)
    }

    return (
        <div className={`mb-10 ${s.wrapper}`}>
            {ingridientDetail &&
                <Modal withTitle isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
                    <IngridientDetails ingridient={ingridientDetail} />
                </Modal>
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
                                    <div onClick={() => handleModalOpen(item)} key={item._id} className={`ml-4 ${s.ingridient}`}>
                                        <img className='ml-4 mr-4' src={item.image} alt={item.name} />
                                        <div className={`mt-1 mb-1 ${s.ingridient__price}`}>
                                            <p className='text text_type_digits-default'>{item.price}</p>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                        <p className='text text_type_main-default' style={{ minHeight: '48px', width: '100%', textAlign: 'center' }}>Краторная булка N-200i</p>
                                        <Counter count={0} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
