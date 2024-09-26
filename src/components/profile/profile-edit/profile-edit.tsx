import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './profile-edit.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react';

export const ProfileEdit = () => {
    const [formValues, setFormValues] = useState({ name: '', email: '', password: '' })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: [e.target.value].toString() })
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(formValues)
    }

    return (
        <form className={s.wrapper} onSubmit={onSubmit}>
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
