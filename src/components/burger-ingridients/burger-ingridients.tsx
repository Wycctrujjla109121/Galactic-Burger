import { selectIngridients } from '../../services/ingridients/ingridients-slice';
import { useAppSelector } from '../../services/store';
import s from './burger-ingridients.module.scss';
import { ChoiseType } from './choise-type';
import { IngridientsList } from './ingridients-list';

export const BurgerIngridients = () => {
    const ingridients = useAppSelector(selectIngridients)

    const ingridientTypeName = Array.from(new Set(ingridients.map(i => i.type)))

    return (
        <section className={s.wrapper}>
            <p className="text text_type_main-large mt-10">
                Соберите бургер
            </p>

            <ChoiseType choiseType={ingridientTypeName} />

            <IngridientsList choiseName={ingridientTypeName} />
        </section>
    );
};
