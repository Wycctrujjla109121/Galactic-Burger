import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { IngridientsType } from "../../../types/ingridients-type"

import { useRef } from "react"
import { useDrag } from "react-dnd"
import { changeNavigationMenuType, selectConstructorIngridients, selectIngridientBun, selectIngridients, selectNavigationMenuType } from "../../../services/ingridients/ingridients-slice"
import s from './ingridients-list.module.scss'
import { Link, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../services/store"

export const IngridientsList = ({ choiseName }: { choiseName: string[] }) => {
    const location = useLocation()

    const dispatch = useAppDispatch()
    const ingridients = useAppSelector(selectIngridients)
    const ingridientsConstructor = useAppSelector(selectConstructorIngridients)
    const ingridientBun = useAppSelector(selectIngridientBun)
    const navigationMenuType = useAppSelector(selectNavigationMenuType)

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
            <div key={item._id} ref={drag} style={{ opacity: isOpacity }} className={`ml-4 ${s.ingridient}`}>
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

    const wrapperRef = useRef<HTMLDivElement>(null)
    const bunRef = useRef<HTMLDivElement>(null)
    const mainRef = useRef<HTMLDivElement>(null)
    const sauceRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        const wrapperOffset = wrapperRef.current?.offsetTop
        const bunRect = bunRef.current?.getBoundingClientRect()
        const mainRect = mainRef.current?.getBoundingClientRect()
        const sauceRect = sauceRef.current?.getBoundingClientRect()

        if (bunRect && mainRect && sauceRect && wrapperOffset) {
            const bunDistance = Math.abs(bunRect.top - wrapperOffset)
            const mainDistance = Math.abs(mainRect.top - wrapperOffset)
            const sauceDistance = Math.abs(sauceRect.top - wrapperOffset)

            const minDistance = Math.min(bunDistance, mainDistance, sauceDistance)

            if (minDistance === bunDistance && navigationMenuType !== 'bun') {
                dispatch(changeNavigationMenuType('bun'))
            } else if (minDistance === mainDistance && navigationMenuType !== 'main') {
                dispatch(changeNavigationMenuType('main'))
            } else if (minDistance === sauceDistance && navigationMenuType !== 'sauce') {
                dispatch(changeNavigationMenuType('sauce'))
            }
        }
    }

    return (
        <div
            ref={wrapperRef}
            onScroll={handleScroll}
            className={s.wrapper}>
            {
                choiseName.map(type => (
                    <div
                        ref={type === 'bun' ? bunRef : type === 'main' ? mainRef : sauceRef}
                        key={type}
                        id={type}
                        className='mt-10'
                    >
                        <p className="text text_type_main-large mb-6">
                            {type === 'bun' ? 'Булки' : type === 'main' ? 'Начинка' : 'Соусы'}
                        </p>
                        <div className={s.ingridient__list}>
                            {
                                ingridients.filter(ingridient => ingridient.type === type).map(item => (
                                    <Link className={s.ingridient__item} state={{ backgroundLocation: location }} to={`/ingridient/:${item._id}`} key={item._id}>
                                        <DraggableIngridient item={item} />
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
