import React from 'react';
import s from './feed-info.module.scss'

const testOrdersReady = ['034533', '034532', '034530', '034527', '034525']
const testOrderWait = ['034538', '034541', '034542']

export const FeedInfo = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.wrapper__header}>
                <div className={s.wrapper__column}>
                    <p className="text text_type_main-medium mb-6">
                        Готовы:
                    </p>
                    {
                        testOrdersReady.map(item => (
                            <p className={`text text_type_digits-default mb-2 ${s.wrapper__green}`}>{item}</p>
                        ))
                    }
                </div>
                <div className={s.wrapper__column}>
                    <p className="text text_type_main-medium mb-6">
                        В работе:
                    </p>
                    {
                        testOrderWait.map(item => (
                            <p className="text text_type_digits-default mb-2">{item}</p>
                        ))
                    }
                </div>
            </div>
            <div className={s.wrapper__info}>
                <p className="text text_type_main-small">
                    Выполнено за все время:
                </p>
                <p className="text text_type_digits-large">28 752</p>
            </div>
            <div className={s.wrapper__info}>
                <p className="text text_type_main-small">
                    Выполнено за сегодня:
                </p>
                <p className="text text_type_digits-large">138</p>
            </div>
        </div>
    );
};
