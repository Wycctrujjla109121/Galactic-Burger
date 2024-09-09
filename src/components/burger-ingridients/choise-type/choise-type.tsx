import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"

import s from './choise-type.module.scss'

export const ChoiseType = ({ choiseType }: { choiseType: string[] }) => {
    const [current, setCurrent] = useState(choiseType[0])
    return (
        <div className={`mt-5 ${s.wrapper}`}>
            {
                choiseType.map(type => <Tab key={type} value={type} onClick={setCurrent} active={current === type}>{type}</Tab>)
            }
        </div>
    )
}
