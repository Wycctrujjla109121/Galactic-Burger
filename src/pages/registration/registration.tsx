import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { CustomLink, InputPassword } from "../../components";
import { LINKS } from "../../constants";
import { useAppDispatch } from "../../services/store";
import { registration } from "../../services/user/user-slice";

export const RegistrationPage = () => {
    const [formValues, setFormValues] = useState({ name: '', email: '', password: '' })

    const dispatch = useAppDispatch()

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(registration(formValues))
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    return (
        <div className={'form'}>
            <div className={'form__content'}>
                <form className={'form__info'} onSubmit={e => onSubmit(e)}>
                    <p className="text text_type_main-medium">
                        Регистрация
                    </p>
                    <Input
                        autoComplete="name"
                        value={formValues.name ?? ''}
                        name='name'
                        onChange={onChange}
                        type='text'
                        placeholder='Имя'
                    />
                    <Input
                        autoComplete="email"
                        value={formValues.email ?? ''}
                        name='email'
                        onChange={onChange}
                        type='email'
                        placeholder='E-mail'
                    />
                    <InputPassword
                        autoComplete="new-password"
                        value={formValues.password}
                        handleChange={onChange}
                    />
                    <Button htmlType={'submit'}>
                        Зарегистрироваться
                    </Button>
                </form>
                <div className={'form__description'}>
                    <CustomLink href={LINKS.login} text="Уже зарегистрированы?" link={"Войти"} />
                </div>
            </div>
        </div>
    );
};
