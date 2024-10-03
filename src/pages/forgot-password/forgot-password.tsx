import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CustomLink } from "../../components";
import { LINKS } from "../../constants";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../services/store";
import { forgotPassword, selectIsLoading } from "../../services/user/user-slice";
import { useNavigate } from "react-router";

export const ForgotPasswordPage = () => {
    const [formValue, setFormValue] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoading = useSelector(selectIsLoading)

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(forgotPassword(formValue))
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValue(e.target.value)
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
                        value={formValue ?? ''}
                        name='email'
                        onChange={onChange}
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
