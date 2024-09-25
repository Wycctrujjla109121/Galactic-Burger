import { useEffect } from 'react';
import s from './App.module.scss';
import { AppHeader } from './components';
import { useDispatch } from 'react-redux';
import { fetchIngridients } from './services/ingridients/ingridients-slice';
import { AppDispatch } from './services/store';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ForgotPasswordPage, LoginPage, MainPage, NotFoundPage, RegistrationPage } from './pages';

function App() {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchIngridients())
  }, [dispatch])

  return (
    <div className={s.wrapper}>
      <AppHeader />
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/registration/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
