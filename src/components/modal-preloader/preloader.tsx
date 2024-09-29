import { createPortal } from "react-dom";
import { ModalOverlay } from "../modal-overlay";

import s from './preloader.module.scss'
import { Preloader } from "../preloader";

export const ModalPreloader = () => {
    return createPortal(
        <div className={s.wrapper}>
            <Preloader />
            <ModalOverlay />
        </div>, document.getElementById('modals')!
    );
};
