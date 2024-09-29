import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './profile-edit.module.scss'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectUser, updateUserInfo } from '../../../services/user/user-slice';
import { AppDispatch } from '../../../services/store';

export const ProfileEdit = () => {
    const user = useSelector(selectUser)
    const isLoading = useSelector(selectIsLoading)
    const dispatch = useDispatch<AppDispatch>()

    const [formValues, setFormValues] = useState({ name: '', email: '', password: '' })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSaveVisible(true)
        setFormValues({ ...formValues, [e.target.name]: [e.target.value].toString() })
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(updateUserInfo(formValues))
    }

    const onReset = () => {
        setSaveVisible(false)
        setFormValues(prev => ({ ...prev, name: user?.name ?? '', email: user?.email ?? '' }))
    }

    useEffect(() => {
        setFormValues(prev => ({ ...prev, name: user?.name ?? '', email: user?.email ?? '' }))
    }, [isLoading])

    const [nameDisabled, setNameDisabled] = useState(true)
    const [emailDisabled, setEmailDisabled] = useState(true)
    const [PasswordDisabled, setPasswordDisabled] = useState(true)

    const [saveVisible, setSaveVisible] = useState(false)

    return (
        <form className={s.wrapper} onSubmit={onSubmit} onReset={onReset}>
            <Input
                disabled={nameDisabled}
                name='name'
                type='text'
                placeholder='Имя'
                value={formValues.name ?? ''}
                icon='EditIcon'
                onChange={handleChange}
                onIconClick={() => setNameDisabled(prev => !prev)}
            />
            <Input
                disabled={emailDisabled}
                name='email'
                type='email'
                placeholder='Логин'
                icon='EditIcon'
                value={formValues.email ?? ''}
                onChange={handleChange}
                onIconClick={() => setEmailDisabled(prev => !prev)}
            />
            <Input
                disabled={PasswordDisabled}
                name='password'
                type='password'
                placeholder='Пароль'
                icon='EditIcon'
                value={formValues.password ?? ''}
                onChange={handleChange}
                onIconClick={() => setPasswordDisabled(prev => !prev)}
            />
            {
                saveVisible &&
                <div className={s.wrapper__buttons}>
                    <Button htmlType={'reset'} type="secondary" size="large">
                        Отмена
                    </Button>
                    <Button htmlType={'submit'}>
                        Сохранить
                    </Button>
                </div>
            }
        </form>
    );
};
