import { useEffect, useState } from "react";
import { Modal } from "../../components";
import { IngridientDetails } from "../../components/burger-ingridients/ingridient-details";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../services/store";
import { addSelectIngridient, selectIngridients } from "../../services/ingridients/ingridients-slice";
import { useNavigate, useParams } from "react-router";

export const ModalPage = () => {
    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()
    const { id } = useParams()
    const ingridients = useSelector(selectIngridients)
    const dispatch = useDispatch<AppDispatch>()

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
        <Modal withTitle isOpen={isOpen} setIsOpen={handleClosePopup}>
            <IngridientDetails />
        </Modal>
    );
};
