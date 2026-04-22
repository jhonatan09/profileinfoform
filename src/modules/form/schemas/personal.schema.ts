import { z } from 'zod'

export const personalSchema = z.object({
    name: z.string().min(3, 'Nome obrigatório'),
    cpf: z.string().length(14, 'CPF inválido'),
    phone: z.string().min(14, 'Telefone inválido'),
    birthDate: z.string().length(10, 'Data inválida'),
    email: z.string().email('Email inválido'),
})

export type PersonalFormData = z.infer<typeof personalSchema>