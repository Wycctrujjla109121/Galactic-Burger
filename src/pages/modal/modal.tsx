import { useEffect, useState } from "react";
import { Modal } from "../../components";
import { useSelector } from "react-redux";
import { addSelectIngridient, selectIngridients } from "../../services/ingridients/ingridients-slice";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../services/store";

export const ModalPage = ({ content, title }: { content: React.ReactNode, title?: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()
    const { id } = useParams()
    const ingridients = useSelector(selectIngridients)
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
        <Modal title={title} isOpen={isOpen} setIsOpen={handleClosePopup}>
            {content}
        </Modal>
    );
};
