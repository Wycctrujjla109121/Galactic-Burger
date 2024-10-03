import { ChangeEvent, useState } from "react"

interface FormType{
    [key:string]:string
}

export const useForm = (formState: FormType) => {
    const [form, setForm] = useState(formState)

    const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
        const element = e.target

        setForm((prev) => ({...prev, [element.name]: element.value}))
    }

    const resetChangeForm = () => {
        setForm(formState)
    }

    return {form, handleChangeForm,resetChangeForm}
}
