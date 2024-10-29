import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './profile-edit.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react';
import { selectUser, updateUserInfo } from '../../../services/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { useForm } from '../../../hooks';

export const ProfileEdit = () => {
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()

    const { form, handleChangeForm, resetChangeForm } = useForm({ name: user?.name ?? '', email: user?.email ?? '', password: '' })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSaveVisible(true)
        handleChangeForm(e)
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(updateUserInfo({ name: form.name, email: form.email, password: form.password }))
    }

    const onReset = () => {
        setSaveVisible(false)
        resetChangeForm()
    }

    const [nameDisabled, setNameDisabled] = useState(true)
    const [emailDisabled, setEmailDisabled] = useState(true)
    const [PasswordDisabled, setPasswordDisabled] = useState(true)

    const [saveVisible, setSaveVisible] = useState(false)

    return (
        <form className={s.wrapper} onSubmit={onSubmit} onReset={onReset}>
            <Input
                autoComplete='name'
                disabled={nameDisabled}
                name='name'
                type='text'
                placeholder='Имя'
                value={form.name ?? ''}
                icon='EditIcon'
                onChange={handleChange}
                onIconClick={() => setNameDisabled(prev => !prev)}
            />
            <Input
                autoComplete='email'
                disabled={emailDisabled}
                name='email'
                type='email'
                placeholder='Логин'
                icon='EditIcon'
                value={form.email ?? ''}
                onChange={handleChange}
                onIconClick={() => setEmailDisabled(prev => !prev)}
            />
            <Input
                autoComplete='current-password'
                disabled={PasswordDisabled}
                name='password'
                type='password'
                placeholder='Пароль'
                icon='EditIcon'
                value={form.password ?? ''}
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
