import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, useState } from "react";

export const InputPassword = ({ value, handleChange }: { value: string, handleChange: (value: ChangeEvent<HTMLInputElement>) => void }) => {
    const [isPassword, setIspassword] = useState<'password' | 'text'>('password')

    const handleVisibleIcon = () => {
        isPassword === 'password' ? setIspassword('text') : setIspassword('password')
    }

    return (
        <Input
            value={value ?? ''}
            placeholder="Пароль"
            name="password"
            type={isPassword}
            icon={isPassword === 'password' ? 'HideIcon' : 'ShowIcon'}
            onIconClick={handleVisibleIcon}
            onChange={e => handleChange(e)}
        />
    );
};
