import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { CustomLink } from "../../components";
import { LINKS } from "../../constants";

export const ForgotPasswordPage = () => {
    const [formValue, setFormValue] = useState('')

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(formValue)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValue(e.target.value)
    }

    return (
        <div className={'form'}>
            <div className={'form__content'}>
                <form className={'form__info'} onSubmit={e => onSubmit(e)}>
                    <p className="text text_type_main-medium">
                        Восстановление пароля
                    </p>
                    <Input
                        value={formValue ?? ''}
                        name='email'
                        onChange={onChange}
                        type='email'
                        placeholder='E-mail'
                    />
                    <Button htmlType={'submit'}>
                        Зарегистрироваться
                    </Button>
                </form>
                <div className={'form__description'}>
                    <CustomLink href={LINKS.login} text="Вспомнили пароль?" link={"Войти"} />
                </div>
            </div>
        </div>
    );
};
