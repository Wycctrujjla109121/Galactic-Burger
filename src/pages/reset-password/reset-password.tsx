import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { CustomLink, InputPassword } from "../../components";
import { LINKS } from "../../constants";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, selectError, selectIsLoading } from "../../services/user/user-slice";
import { AppDispatch } from "../../services/store";

export const ResetPasswordPage = () => {
    const [formValues, setFormValues] = useState({ password: '', token: '' })

    const navigate = useNavigate()
    const isLoading = useSelector(selectIsLoading)
    const isError = useSelector(selectError)
    const dispatch = useDispatch<AppDispatch>()

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(resetPassword(formValues))
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
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
                        value={formValues.password}
                        handleChange={onChange}
                    />
                    <Input
                        value={formValues.token ?? ''}
                        name='token'
                        onChange={onChange}
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
