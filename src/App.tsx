import s from './App.module.scss';
import { AppHeader, BurgerConstructor, BurgerIngridients } from './components';
import { ingridients } from './utils/data';

function App() {
  const ingridientData = ingridients
  return (
    <div>
      <AppHeader />
      <main className={s.main}>
        <BurgerIngridients ingridients={ingridientData} />
        <BurgerConstructor ingridients={ingridientData} />
      </main>
    </div>
  );
}

export default App;
