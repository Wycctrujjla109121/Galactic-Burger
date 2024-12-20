import done from '../../../images/done.png'

import s from './order-details.module.scss'
import { selectOrderDetails } from '../../../services/ingridients/ingridients-slice';
import { Preloader } from '../../preloader';
import { useAppSelector } from '../../../services/store';

export const OrderDetails = () => {
    const orderDetail = useAppSelector(selectOrderDetails)

    return (
        <div className={s.wrapper} >
            {
                orderDetail ?
                    <>
                        <p className="text text_type_digits-large">{orderDetail?.order?.number}</p>
                        <p className="text text_type_main-medium mt-8">
                            идентификатор заказа
                        </p>
                        <img className={`mt-15 mb-15 ${s.wrapper__img}`} src={done} alt="Успешно" />
                        <p className="mb-2 text text_type_main-default">
                            Ваш заказ начали готовить
                        </p>
                        <p className="text text_type_main-default mb-30 text_color_inactive">
                            Дождитесь готовности на орбитальной станции
                        </p>
                    </>
                    : <div className="p-10">
                        <Preloader />
                    </div>
            }
        </div >
    );
};
