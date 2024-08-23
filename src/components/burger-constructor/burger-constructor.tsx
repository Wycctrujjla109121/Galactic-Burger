import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngridientsType } from '../../types/ingridients-type';
import { BurgerConstructorLayout } from './burger-constructor-layout';

import s from './burger-constructor.module.scss';

export const BurgerConstructor = ({ ingridients }: { ingridients: IngridientsType[] }) => {

    return (
        <section className={`${s.wrapper} mt-25`}>
            <BurgerConstructorLayout>
                {
                    ingridients.map(ingridient => (
                        <div key={ingridient._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                extraClass='ml-2'
                                text={ingridient.name}
                                price={ingridient.price}
                                thumbnail={ingridient.image}
                            />
                        </div>
                    ))
                }
            </BurgerConstructorLayout>

            <div className={`mt-10 ${s.wrapper__info}`}>
                <div className={`mr-10 ${s.wrapper__price}`}>
                    <p className="text text_type_digits-medium mr-2">
                        625
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Нажми на меня
                </Button>
            </div>
        </section>
    );
};
