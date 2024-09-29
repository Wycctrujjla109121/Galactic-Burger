import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerConstructor, BurgerIngridients } from '../../components';
import s from './main.module.scss';

export const MainPage = () => {
    return (
        <main className={s.wrapper}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngridients />
                <BurgerConstructor />
            </DndProvider>
        </main>
    );
};
