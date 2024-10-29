import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { CustomLink, InputPassword } from "../../components";
import { LINKS } from "../../constants";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { resetPassword, selectError, selectIsLoading } from "../../services/user/user-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { useForm } from "../../hooks";

export const ResetPasswordPage = () => {
    const { form, handleChangeForm } = useForm({ password: '', token: '' })

    const navigate = useNavigate()
    const isLoading = useAppSelector(selectIsLoading)
    const isError = useAppSelector(selectError)
    const dispatch = useAppDispatch()

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(resetPassword({ password: form.password, token: form.token }))
    }

    useEffect(() => {
        (!isError && !localStorage.getItem('resetPassword')) && navigate(LINKS.forgotPassword)
    }, [isLoading, isError, navigate])

    return (
        <div className={'form'}>
            <div className={'form__content'}>
                <form className={'form__info'} onSubmit={e => onSubmit(e)}>
                    <p className="text text_type_main-medium">
                        Восстановление пароля
                    </p>
                    <InputPassword
                        autoComplete="new-password"
                        value={form.password}
                        handleChange={handleChangeForm}
                    />
                    <Input
                        value={form.token ?? ''}
                        name='token'
                        onChange={handleChangeForm}
                        type='text'
                        placeholder='Введите код из письма'
                    />
                    <Button htmlType={'submit'}>
                        Сохранить
                    </Button>
                </form>
                <div className={'form__description'}>
                    <CustomLink href={LINKS.login} text="Вспомнили пароль?" link={"Войти"} />
                </div>
            </div>
        </div>
    );
};
