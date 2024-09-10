import { useEffect } from 'react';
import s from './App.module.scss';
import { AppHeader, BurgerConstructor, BurgerIngridients } from './components';
import { useDispatch } from 'react-redux';
import { fetchIngridients } from './services/ingridients/ingridients-slice';
import { AppDispatch } from './services/store';

function App() {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchIngridients())
  }, [dispatch])

  return (
    <div>
      <AppHeader />
      <main className={s.main}>
        <BurgerIngridients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
