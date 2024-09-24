import { useSelector } from "react-redux";

import s from './ingridient-details.module.scss'
import { selectIngridient } from "../../../services/ingridients/ingridients-slice";

export const IngridientDetails = () => {
    const ingridient = useSelector(selectIngridient)

    return (
        <>
            <img className={s.img} src={ingridient?.image_large} alt={ingridient?.name} />
            <p className="text text_type_main-medium mt-4 mb-8">
                {ingridient?.name}
            </p>
            <div className={`${s.list} mb-15`}>
                <div className={s.list__item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории,ккал
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">{ingridient?.calories}</p>
                </div>

                <div className={s.list__item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">{ingridient?.proteins}</p>
                </div>

                <div className={s.list__item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">{ingridient?.fat}</p>
                </div>

                <div className={s.list__item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">{ingridient?.carbohydrates}</p>
                </div>
            </div>
        </>
    );
};
