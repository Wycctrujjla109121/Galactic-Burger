import { useEffect } from 'react';
import s from './App.module.scss';
import { AppHeader, AuthUser, ModalPreloader, NotAuthUser } from './components';
import { useAppDispatch, useAppSelector } from './services/store';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ForgotPasswordPage, IngridientPage, LoginPage, MainPage, ModalPage, NotFoundPage, ProfilePage, RegistrationPage, ResetPasswordPage } from './pages';
import { ProfileEdit } from './components/profile/profile-edit';
import { authChecked, selectIsLoading } from './services/user/user-slice';
import { fetchIngridients } from './services/ingridients/ingridients-slice';

function App() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }

  useEffect(() => {
    dispatch(authChecked(dispatch))
    dispatch(fetchIngridients())
  }, [])

  if (isLoading) {
    return <ModalPreloader />
  }

  return (
    <div className={s.wrapper}>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<NotAuthUser page={<LoginPage />} />} />
        <Route path='/registration' element={<NotAuthUser page={<RegistrationPage />} />} />
        <Route path='/forgot-password' element={<NotAuthUser page={<ForgotPasswordPage />} />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/order' element={<>Тут списов заказов</>} />
        <Route path='/ingridient/:id' element={<IngridientPage />} />
        <Route path='/profile' element={<AuthUser page={<ProfilePage />} />} >
          <Route index element={<ProfileEdit />} />
          <Route path='orders' element={<>Профиль история заказов</>} />
          <Route path='*' element={<>Такого маршрута не существует</>} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

      {
        state?.backgroundLocation &&
        <Routes>
          <Route path='/ingridient/:id' element={<ModalPage />} />
        </Routes>
      }
    </div >
  );
}

export default App;
