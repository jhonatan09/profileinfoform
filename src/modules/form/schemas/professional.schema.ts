import { z } from 'zod'

export const professionalSchema = z.object({
    jobs: z.array(
        z.object({
            company: z.string().min(1, 'Empresa obrigatória'),
            profession: z.string().min(1, 'Profissão obrigatória'),
            salary: z.string().min(1, 'Salário obrigatório'),
            timeInCompany: z.string().min(1, 'Tempo de empresa obrigatório'),
            isCurrent: z.boolean(),
        })
    ),
})