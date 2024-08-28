import { useEffect, useState } from 'react';
import s from './App.module.scss';
import { AppHeader, BurgerConstructor, BurgerIngridients } from './components';
import { API_URL } from './constants';

function App() {

  const [ingridients, setIngridients] = useState([])

  useEffect(() => {
    fetch(`${API_URL}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => setIngridients(data.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div>
      <AppHeader />
      <main className={s.main}>
        <BurgerIngridients ingridients={ingridients} />
        <BurgerConstructor ingridients={ingridients} />
      </main>
    </div>
  );
}

export default App;
