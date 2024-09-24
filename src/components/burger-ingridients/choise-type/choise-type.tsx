import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

import s from './choise-type.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { changeNavigationMenuType, selectNavigationMenuType } from "../../../services/ingridients/ingridients-slice"

export const ChoiseType = ({ choiseType }: { choiseType: string[] }) => {
    const navigationMenuType = useSelector(selectNavigationMenuType)
    const dispatch = useDispatch()

    const handleChangeType = (type: string) => {
        dispatch(changeNavigationMenuType(type))

        document.getElementById(type)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <div className={`mt-5 ${s.wrapper}`}>
            {
                choiseType.map(type => <Tab key={type} value={type} onClick={() => handleChangeType(type)} active={navigationMenuType === type}>{type === 'bun' ? 'Булки' : type === 'main' ? 'Начинка' : 'Соусы'}</Tab>)
            }
        </div>
    )
}
