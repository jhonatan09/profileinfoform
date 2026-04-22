import { z } from 'zod'

export const addressSchema = z.object({
    cep: z.string().min(9, 'CEP incompleto'),
    street: z.string().min(1, 'Obrigatório'),
    number: z.string().min(1, 'Obrigatório'),
    neighborhood: z.string().min(1, 'Obrigatório'),
    city: z.string().min(1, 'Obrigatório'),
    state: z.string().length(2, 'UF inválida'),
    complement: z.string().optional(),
})

export type AddressData = z.infer<typeof addressSchema>