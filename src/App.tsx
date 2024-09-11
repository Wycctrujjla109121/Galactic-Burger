import { useEffect } from 'react';
import s from './App.module.scss';
import { AppHeader, BurgerConstructor, BurgerIngridients } from './components';
import { useDispatch } from 'react-redux';
import { fetchIngridients } from './services/ingridients/ingridients-slice';
import { AppDispatch } from './services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchIngridients())
  }, [dispatch])

  return (
    <div>
      <AppHeader />
      <main className={s.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngridients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
