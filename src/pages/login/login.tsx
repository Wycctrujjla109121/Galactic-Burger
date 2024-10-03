import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { CustomLink, InputPassword } from "../../components";
import { ChangeEvent, FormEvent, useState } from "react";
import { LINKS } from "../../constants";
import { signIn } from "../../services/user/user-slice";
import { useAppDispatch } from "../../services/store";

export const LoginPage = () => {
    const [formValues, setFormValues] = useState({ email: '', password: '' })

    const dispatch = useAppDispatch()

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(signIn(formValues))
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    return (
        <div className={'form'}>
            <div className={'form__content'}>
                <form className={'form__info'} onSubmit={e => onSubmit(e)}>
                    <p className="text text_type_main-medium">
                        Вход
                    </p>
                    <Input
                        value={formValues.email ?? ''}
                        name='email'
                        onChange={onChange}
                        type='email'
                        placeholder='E-mail'
                    />
                    <InputPassword
                        value={formValues.password}
                        handleChange={onChange}
                    />
                    <Button htmlType={'submit'}>
                        Войти
                    </Button>
                </form>
                <div className={'form__description'}>
                    <CustomLink href={LINKS.registration} text="Вы — новый пользователь?" link={"Зарегистрироваться"} />
                    <CustomLink href={LINKS.forgotPassword} text="Забыли пароль?" link={"Восстановить пароль"} />
                </div>
            </div>
        </div>
    );
};
