import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { CustomLink, InputPassword } from "../../components";
import { FormEvent } from "react";
import { LINKS } from "../../constants";
import { signIn } from "../../services/user/user-slice";
import { useAppDispatch } from "../../services/store";
import { useForm } from "../../hooks";

export const LoginPage = () => {
    const { form, handleChangeForm } = useForm({ email: '', password: '' })

    const dispatch = useAppDispatch()

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(signIn({ email: form.email, password: form.password }))
    }

    return (
        <div className={'form'}>
            <div className={'form__content'}>
                <form className={'form__info'} onSubmit={e => onSubmit(e)}>
                    <p className="text text_type_main-medium">
                        Вход
                    </p>
                    <Input
                        value={form.email ?? ''}
                        name='email'
                        onChange={handleChangeForm}
                        type='email'
                        placeholder='E-mail'
                    />
                    <InputPassword
                        value={form.password}
                        handleChange={handleChangeForm}
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
