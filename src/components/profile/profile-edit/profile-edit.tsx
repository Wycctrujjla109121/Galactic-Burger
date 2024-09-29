import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './profile-edit.module.scss'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, selectIsLoading, selectUser, updateUserInfo } from '../../../services/user/user-slice';
import { AppDispatch } from '../../../services/store';

export const ProfileEdit = () => {
    const user = useSelector(selectUser)
    const isLoading = useSelector(selectIsLoading)
    const dispatch = useDispatch<AppDispatch>()

    const [formValues, setFormValues] = useState({ name: '', email: '', password: '' })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: [e.target.value].toString() })
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(updateUserInfo(formValues))
    }

    const onReset = () => {
        setFormValues(prev => ({ ...prev, name: user?.name ?? '', email: user?.email ?? '' }))
    }

    useEffect(() => {
        setFormValues(prev => ({ ...prev, name: user?.name ?? '', email: user?.email ?? '' }))
    }, [isLoading])

    return (
        <form className={s.wrapper} onSubmit={onSubmit} onReset={onReset}>
            <Input
                name='name'
                type='text'
                placeholder='Имя'
                value={formValues.name ?? ''}
                icon='EditIcon'
                onChange={handleChange} />
            <Input
                name='email'
                type='email'
                placeholder='Логин'
                icon='EditIcon'
                value={formValues.email ?? ''}
                onChange={handleChange} />
            <Input
                name='password'
                type='password'
                placeholder='Пароль'
                icon='EditIcon'
                value={formValues.password ?? ''}
                onChange={handleChange} />
            <div className={s.wrapper__buttons}>
                <Button htmlType={'reset'} type="secondary" size="large">
                    Отмена
                </Button>
                <Button htmlType={'submit'}>
                    Сохранить
                </Button>
            </div>
        </form>
    );
};
