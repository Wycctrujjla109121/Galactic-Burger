import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent } from "react";
import { CustomLink, InputPassword } from "../../components";
import { LINKS } from "../../constants";
import { useAppDispatch } from "../../services/store";
import { registration } from "../../services/user/user-slice";
import { useForm } from "../../hooks";

export const RegistrationPage = () => {
    const { form, handleChangeForm } = useForm({ name: '', email: '', password: '' })

    const dispatch = useAppDispatch()

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(registration({ name: form.name, email: form.email, password: form.password }))
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
                        value={form.name ?? ''}
                        name='name'
                        onChange={handleChangeForm}
                        type='text'
                        placeholder='Имя'
                    />
                    <Input
                        autoComplete="email"
                        value={form.email ?? ''}
                        name='email'
                        onChange={handleChangeForm}
                        type='email'
                        placeholder='E-mail'
                    />
                    <InputPassword
                        autoComplete="new-password"
                        value={form.password}
                        handleChange={handleChangeForm}
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
