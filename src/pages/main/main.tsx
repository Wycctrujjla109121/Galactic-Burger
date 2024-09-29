import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerConstructor, BurgerIngridients } from '../../components';
import s from './main.module.scss';
import { useEffect } from 'react';
import { fetchIngridients } from '../../services/ingridients/ingridients-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';

export const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchIngridients())
    }, [])

    return (
        <main className={s.wrapper}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngridients />
                <BurgerConstructor />
            </DndProvider>
        </main>
    );
};
