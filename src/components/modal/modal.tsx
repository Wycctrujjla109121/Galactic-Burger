import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './modal.module.scss'
import { useEffect } from 'react';
import { ModalOverlay } from '../modal-overlay';
import { createPortal } from 'react-dom';

export const Modal = ({
    title,
    children,
    isOpen,
    setIsOpen,
    dataTestId
}:
    {
        title?: React.ReactNode,
        children: React.ReactNode,
        isOpen: boolean,
        setIsOpen: () => void,
        dataTestId?: string
    }) => {

    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen()
        }
    }

    const handleClose = () => {
        setIsOpen()
    }

    useEffect(() => {
        document.addEventListener("keydown", handleEscape, false);

        return () => {
            document.removeEventListener("keydown", handleEscape, false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return createPortal(
        <div className={[s.wrapper, isOpen ? s.wrapper_open : s.wrapper_close].join(' ')} data-test-id={dataTestId}>
            <div className={s.wrapper__info}>
                <div className={`pt-15 pr-10 pl-10 ${s.wrapper__header}`}>
                    {/* {
                        <p className="text text_type_main-large">
                            {title ?? ''}
                        </p>
                    } */}
                    {title ?? ''}
                    <button onClick={handleClose} className={s.wrapper__button}>
                        <CloseIcon type={'primary'} />
                    </button>
                </div>
                {children}
            </div>

            <ModalOverlay setIsOpen={handleClose} />
        </div>, document.getElementById('modals')!
    )
};
