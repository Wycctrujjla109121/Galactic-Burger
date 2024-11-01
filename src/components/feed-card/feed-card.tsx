import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CardOrderType } from '../../types/feed.types';

import s from './feed.module.scss'
import { Link, useLocation } from 'react-router-dom';

export const FeedCard = ({ orderNumber, date, price, ingridients, name }: CardOrderType) => {
    const locaton = useLocation()

    return (
        <Link className={`${s.card} p-6`} state={{ backgroundLocation: locaton }} to={`${locaton.pathname}/:${orderNumber}`}>
            <div className={s.card__header}>
                <p className="text text_type_digits-default">#{orderNumber}</p>
                <p className="text text_type_main-default text_color_inactive">
                    {date}
                </p>
            </div>
            <p className="text text_type_main-medium mt-6 mb-6">{name}</p>
            <div className={`${s.card__content}`}>
                <div className={s.card__content__list}>
                    {
                        ingridients.slice(0, 6).map((item, index) => (
                            <span className={s.card__span} style={{ left: index * 10 + '%' }}>
                                <img data-count className={s.card__img} src={item.image} alt={item.name} />
                                {
                                    index === 5 && ingridients.length - 6 > 0 &&
                                    <p className={`text text_type_digits-default ${s.card__span_number}`}>
                                        +{ingridients.length - 6}
                                    </p>
                                }
                            </span>
                        ))
                    }
                </div>
                <p className={`${s.card__price} text text_type_digits-medium`}>
                    <CurrencyIcon type="primary" />
                    {price}
                </p>
            </div>
        </Link>
    );
};
