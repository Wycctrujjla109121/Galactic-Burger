import { useParams } from "react-router";
import { IngridientDetails } from "../../components/burger-ingridients/ingridient-details";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSelectIngridient, selectIngridients } from "../../services/ingridients/ingridients-slice";

import s from './ingridient.module.scss'

export const IngridientPage = () => {
    const { id } = useParams()

    const ingridients = useSelector(selectIngridients)
    const dispatch = useDispatch()

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
