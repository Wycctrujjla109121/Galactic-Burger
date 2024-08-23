import s from './App.module.scss';
import { AppHeader, BurgerIngridients } from './components';
import { ingridients } from './utils/data';

function App() {
  const ingridientData = ingridients
  return (
    <div className={s.wrapper}>
      <AppHeader />
      <BurgerIngridients ingridients={ingridientData} />
    </div>
  );
}

export default App;
