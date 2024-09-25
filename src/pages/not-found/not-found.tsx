import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './not-found.module.scss'
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/')
    }

    return (
        <div className={s.wrapper}>
            <div className={s.wrapper__content}>
                <p className="text text_type_main-default">
                    К сожалению страница не найдена
                </p>
                <Button onClick={handleBack} htmlType="button" type="secondary" size="medium">
                    На главную
                </Button>
            </div>
        </div>
    );
};
