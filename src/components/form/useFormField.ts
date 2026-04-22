import { useFormContext } from 'react-hook-form'

export const useFormField = (name: string) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    return {
        register: register(name),
        error: errors[name]?.message as string | undefined,
    }
}