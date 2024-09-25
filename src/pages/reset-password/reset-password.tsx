import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { CustomLink, InputPassword } from "../../components";
import { LINKS } from "../../constants";
import { ChangeEvent, FormEvent, useState } from "react";

export const ResetPasswordPage = () => {
    const [formValues, setFormValues] = useState({ password: '', code: '' })

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(formValues)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

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
                        value={formValues.code ?? ''}
                        name='code'
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
