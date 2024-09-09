import s from './modal-overlay.module.scss'

export const ModalOverlay = ({ setIsOpen }: { setIsOpen: () => void }) => {
    return (
        <div onClick={setIsOpen} className={s.wrapper}></div>
    );
};
