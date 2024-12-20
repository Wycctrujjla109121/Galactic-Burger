import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useEffect } from "react";
import { CustomLink } from "../../components";
import { LINKS } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { forgotPassword, selectIsLoading } from "../../services/user/user-slice";
import { useNavigate } from "react-router";
import { useForm } from "../../hooks";

export const ForgotPasswordPage = () => {
    const { form, handleChangeForm } = useForm({ email: '' })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoading = useAppSelector(selectIsLoading)

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(forgotPassword(form.email))
    }

    useEffect(() => {
        localStorage.getItem('resetPassword') && navigate(LINKS.resetPassword)
    }, [isLoading])

    return (
        <div className={'form'}>
            <div className={'form__content'}>
                <form className={'form__info'} onSubmit={e => onSubmit(e)}>
                    <p className="text text_type_main-medium">
                        Восстановление пароля
                    </p>
                    <Input
                        autoComplete="email"
                        value={form.email ?? ''}
                        name='email'
                        onChange={handleChangeForm}
                        type='email'
                        placeholder='E-mail'
                    />
                    <Button htmlType={'submit'}>
                        Восстановить
                    </Button>
                </form>
                <div className={'form__description'}>
                    <CustomLink href={LINKS.login} text="Вспомнили пароль?" link={"Войти"} />
                </div>
            </div>
        </div>
    );
};
