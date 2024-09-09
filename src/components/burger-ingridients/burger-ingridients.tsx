import { IngridientsType } from '../../types/ingridients-type';
import s from './burger-ingridients.module.scss';
import { ChoiseType } from './choise-type';
import { IngridientsList } from './ingridients-list';

export const BurgerIngridients = ({ ingridients }: { ingridients: IngridientsType[] }) => {

    const ingridientTypeName = Array.from(new Set(ingridients.map(i => i.type)))

    return (
        <section className={s.wrapper}>
            <p className="text text_type_main-large mt-10">
                Соберите бургер
            </p>

            <ChoiseType choiseType={ingridientTypeName} />

            <IngridientsList ingridients={ingridients} choiseName={ingridientTypeName} />
        </section>
    );
};
