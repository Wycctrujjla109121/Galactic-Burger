import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './modal.module.scss'
import { useEffect } from 'react';
import { ModalOverlay } from '../modal-overlay';
import { createPortal } from 'react-dom';

export const Modal = ({
    withTitle,
    children,
    isOpen,
    setIsOpen
}:
    {
        withTitle?: boolean,
        children: React.ReactNode,
        isOpen: boolean,
        setIsOpen: () => void
    }) => {

    useEffect(() => {
        document.addEventListener("keydown", e => {
            e.key === 'Escape' && setIsOpen()
        }, false);

        return () => {
            document.removeEventListener("keydown", e => {
                e.key === 'Escape' && setIsOpen()
            }, false);
        };
    })

    return createPortal(
        <div className={[s.wrapper, isOpen ? s.wrapper_open : s.wrapper_close].join(' ')}>
            <div className={s.wrapper__info}>
                <div className={`pt-15 pr-10 pl-10 ${s.wrapper__header}`}>
                    <p className="text text_type_main-large">
                        {withTitle ? 'Детали ингридиента' : ''}
                    </p>
                    <button onClick={setIsOpen} className={s.wrapper__button}>
                        <CloseIcon type={'primary'} />
                    </button>
                </div>
                {children}
            </div>

            <ModalOverlay setIsOpen={setIsOpen} />
        </div>, document.body
    )
};
