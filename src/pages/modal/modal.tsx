import { useEffect, useState } from "react";
import { Modal } from "../../components";
import { addSelectIngridient, selectIngridients } from "../../services/ingridients/ingridients-slice";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../services/store";

export const ModalPage = ({ content, title, dataTestId }: { content: React.ReactNode, title?: React.ReactNode, dataTestId?: string }) => {
    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()
    const { id } = useParams()
    const ingridients = useAppSelector(selectIngridients)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const ingridient = ingridients.find(item => item._id === id?.replace(':', ''))

        if (ingridient) {
            dispatch(addSelectIngridient(ingridient))
        }
    }, [])

    const handleClosePopup = () => {
        navigate(-1)
        setIsOpen(false)
    }

    return (
        <Modal dataTestId={dataTestId} title={title} isOpen={isOpen} setIsOpen={handleClosePopup}>
            {content}
        </Modal>
    );
};
