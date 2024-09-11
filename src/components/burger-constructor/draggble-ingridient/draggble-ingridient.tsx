import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { DragLayerMonitor, DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import { useDispatch } from "react-redux";
import { removeIngridient } from "../../../services/ingridients/ingridients-slice";
import { ConstructorIngridientsType, DragItemType } from "../../../types/ingridients-type";

import s from './draggble-ingridient.module.scss';

export const DraggbleIngridient = (
    {
        ingridient,
        index,
        moveIngridient
    }: {
        ingridient: ConstructorIngridientsType,
        index: number,
        moveIngridient: (currentElementIndex: number, hoverIndex: number) => void
    }) => {
    const dispatch = useDispatch()
    const ref = useRef<HTMLDivElement>(null)

    const [{ handlerId }, drop] = useDrop({
        accept: 'items',
        collect: monitor => ({
            handlerId: monitor.getHandlerId()
        }),
        hover: (item: DragItemType, monitor: DropTargetMonitor) => {
            if (!ref.current) {
                return
            }

            const currentElementIndex = item.index
            const hoverIndex = index

            if (currentElementIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (currentElementIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (currentElementIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveIngridient(currentElementIndex, hoverIndex)

            item.index = hoverIndex
        }
    })

    const [{ isOpacity }, drag] = useDrag({
        type: 'items',
        item: { ingridient, index },
        collect: (monitor: DragLayerMonitor) => ({
            isOpacity: monitor.isDragging() ? 0 : 1,
        }),
    })

    drag(drop(ref))

    return (
        <div
            ref={ref}
            className={s.item}
            key={ingridient.uniqId}
            style={{ opacity: isOpacity }}
            data-handler-id={handlerId}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                handleClose={() => dispatch(removeIngridient(ingridient))}
                extraClass='ml-2 mt-4'
                text={ingridient.name}
                price={ingridient.price}
                thumbnail={ingridient.image}
            />
        </div>
    )
};
