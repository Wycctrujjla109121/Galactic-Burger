import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { CardOrderType } from '../../types/feed.types';

import s from './feed.module.scss'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIngridients } from '../../services/ingridients/ingridients-slice';

export const FeedCard = ({ orderNumber, date, ingridients, name }: CardOrderType) => {
    const locaton = useLocation()

    const ingridientsList = useSelector(selectIngridients)
    const filterIngridients = ingridientsList.filter(item => ingridients.includes(item._id))

    return (
        <Link className={`${s.card} p-6`} state={{ backgroundLocation: locaton }} to={`${locaton.pathname}/:${orderNumber}`}>
            <div className={s.card__header}>
                <p className="text text_type_digits-default">#{orderNumber}</p>
                <FormattedDate
                    date={new Date(date)}
                />
            </div>
            <p className="text text_type_main-medium mt-6 mb-6">{name}</p>
            <div className={`${s.card__content}`}>
                <div className={s.card__content__list}>
                    {
                        filterIngridients.slice(0, 6).map((item, index) => (
                            <span key={item._id} className={s.card__span} style={{ left: index * 10 + '%' }}>
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
                    {filterIngridients.reduce((acc, prev) => acc += prev.type === 'bun' ? prev.price * 2 : prev.price, 0)}
                </p>
            </div>
        </Link>
    );
};
