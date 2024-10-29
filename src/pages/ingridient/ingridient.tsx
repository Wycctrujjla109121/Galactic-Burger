import { useParams } from "react-router";
import { IngridientDetails } from "../../components/burger-ingridients/ingridient-details";
import { useEffect } from "react";
import { addSelectIngridient, selectIngridients } from "../../services/ingridients/ingridients-slice";

import s from './ingridient.module.scss'
import { useAppDispatch, useAppSelector } from "../../services/store";

export const IngridientPage = () => {
    const { id } = useParams()

    const ingridients = useAppSelector(selectIngridients)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const ingridient = ingridients.find(item => item._id === id?.replace(':', ''))

        if (ingridient) {
            dispatch(addSelectIngridient(ingridient))
        }
    }, [])

    return (
        <div className={s.wrapper}>
            <div className={s.wrapper__content}>
                <IngridientDetails />
            </div>
        </div>
    );
};
