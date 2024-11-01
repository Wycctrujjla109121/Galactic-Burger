import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../constants/testOrder';
import s from './feed-order.module.scss'

const testData = data

export const FeedOrder = ({ withTitle }: { withTitle?: boolean }) => {
    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                {withTitle && <p className={`text text_type_digits-default ${s.header__text}`}>#{testData.orderNumber}</p>}
                <p className="text text_type_main-medium">{testData.name}</p>
                <p className={`text text_type_main-small ${s.header__text_color}`}>{testData.status}</p>
            </div>
            <p className={`mb-6 text text_type_main-medium ${s.wrapper__title}`}>Состав:</p>
            <div className={s.wrapper__list}>
                {
                    testData.list.map((item) => (
                        <div className={s.item}>
                            <img className={s.item__img} src={item.image} alt={item.name} />
                            <p className="text text_type_main-small">{item.name}</p>
                            <p className={`text text_type_digits-default ${s.item__price}`}>2 x {item.price}<CurrencyIcon type={'primary'} /></p>
                        </div>
                    ))
                }
            </div>
            <div className={`mt-10 ${s.footer}`}>
                <p className="text text_type_main-small text_color_inactive">
                    Вчера, 13:50
                </p>
                <p className={`text text_type_digits-default ${s.footer__price}`}>510 <CurrencyIcon type={'primary'} /></p>
            </div>
        </div>
    );
};
