import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './modal.module.scss'
import { useCallback, useEffect } from 'react';
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

    const handleEscape = (e: KeyboardEvent) => {
        e.key === 'Escape' && setIsOpen()
    }

    useEffect(() => {
        document.addEventListener("keydown", handleEscape, false);

        return () => {
            document.removeEventListener("keydown", handleEscape, false);
        };
    }, [])

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
