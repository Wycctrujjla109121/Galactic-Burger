import { useEffect } from 'react';
import s from './App.module.scss';
import { AppHeader, AuthUser, FeedOrder, ModalPreloader, NotAuthUser } from './components';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './services/store';
import { Route, Routes, useLocation } from 'react-router-dom';
import { FeedOrderPage, FeedsPage, ForgotPasswordPage, IngridientPage, LoginPage, MainPage, ModalPage, NotFoundPage, ProfileFeedPage, ProfilePage, RegistrationPage, ResetPasswordPage } from './pages';
import { ProfileEdit } from './components/profile/profile-edit';
import { authChecked, selectIsLoading } from './services/user/user-slice';
import { fetchIngridients } from './services/ingridients/ingridients-slice';
import { IngridientDetails } from './components/burger-ingridients/ingridient-details';

function App() {
  const dispatch = useAppDispatch()
  const isLoading = useSelector(selectIsLoading)
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location }

  useEffect(() => {
    dispatch(authChecked(dispatch))
    dispatch(fetchIngridients())
  }, [])

  if (isLoading) {
    return <ModalPreloader />
  }

  const OrderNumber = () => (
    <p className="text text_type_digits-default pt-6 pb-6">
      #{location.pathname.split('/:').slice(1, 2).join()}
    </p>
  )

  return (
    <div className={s.wrapper}>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<NotAuthUser page={<LoginPage />} />} />
        <Route path='/registration' element={<NotAuthUser page={<RegistrationPage />} />} />
        <Route path='/forgot-password' element={<NotAuthUser page={<ForgotPasswordPage />} />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/ingridient/:id' element={<IngridientPage />} />
        <Route path='/profile' element={<AuthUser page={<ProfilePage />} />} >
          <Route index element={<ProfileEdit />} />
          <Route path='orders' element={<ProfileFeedPage />} />
          {/* <Route path='orders/:id' element={<>Профиль история конкретного заказа заказов</>} /> */}
          <Route path='*' element={<>Такого маршрута не существует</>} />
        </Route>
        <Route path='/profile/orders/:id' element={<FeedOrderPage />} />
        <Route path='/feed'>
          <Route index element={<FeedsPage />} />
          <Route path='/feed/:id' element={<FeedOrderPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

      {
        state?.backgroundLocation &&
        <Routes>
          <Route path='/ingridient/:id' element={<ModalPage title='Детали ингридиента' content={<IngridientDetails />} />} />
          {/* Возможно потом title пофиксить */}
          <Route path='/feed/:id' element={<ModalPage title={<OrderNumber />} content={<FeedOrder />} />} />
          <Route path='/profile/orders/:id' element={<ModalPage title={<OrderNumber />} content={<FeedOrder />} />} />
        </Routes>
      }
    </div >
  );
}

export default App;
