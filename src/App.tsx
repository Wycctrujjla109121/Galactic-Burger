import { useEffect } from 'react';
import s from './App.module.scss';
import { AppHeader } from './components';
import { useDispatch } from 'react-redux';
import { fetchIngridients } from './services/ingridients/ingridients-slice';
import { AppDispatch } from './services/store';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ForgotPasswordPage, LoginPage, MainPage, NotFoundPage, ProfilePage, RegistrationPage, ResetPasswordPage } from './pages';

function App() {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchIngridients())
  }, [dispatch])

  return (
    <div className={s.wrapper}>
      <Router>
        <AppHeader />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/order' element={<>Тут списов заказов</>} />
          <Route path='/profile' element={<ProfilePage />} >
            <Route index element={<>Профиль редактирование</>} />
            <Route path='orders' element={<>Профиль история заказов</>} />
            <Route path='*' element={<>Такого маршрута не существует</>} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
