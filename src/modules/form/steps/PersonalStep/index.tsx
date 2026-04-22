import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { personalSchema } from '../../schemas/personal.schema'
import type { PersonalFormData } from '../../schemas/personal.schema'
import { useFormStore } from '../../store/formStore'
import { Stepper } from '../../../../components/Stepper'
import { FormProvider } from '../../../../components/form/FormProvider'
import { FormInput } from '../../../../components/form/FormInput'
import { FormMaskedInput } from '../../../../components/form/FormMaskedInput'

export const PersonalStep = () => {
  const { personal, setPersonal, nextStep } = useFormStore()

  const methods = useForm<PersonalFormData>({
    resolver: zodResolver(personalSchema),
    defaultValues: personal,
    mode: 'onSubmit',
  })

  const onSubmit = (data: PersonalFormData) => {
    setPersonal(data)
    nextStep()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <Stepper />

        <FormProvider methods={methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="bg-white/80 backdrop-blur-xl border shadow-xl rounded-2xl p-6"
          >

            <h2 className="text-xl font-semibold mb-4">
              Dados Pessoais
            </h2>

            <div className="flex flex-col gap-4">

              <FormInput name="name" placeholder="Nome completo" />

              <FormMaskedInput
                name="birthDate"
                mask="00/00/0000"
                placeholder="Data de nascimento"
              />

              <FormMaskedInput
                name="cpf"
                mask="000.000.000-00"
                placeholder="CPF"
              />

              <FormMaskedInput
                name="phone"
                mask="(00) 00000-0000"
                placeholder="Telefone"
              />

              <FormInput name="email" placeholder="Email" />

            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white mt-6 py-2 rounded-lg w-full"
            >
              Próximo
            </button>

          </form>
        </FormProvider>

      </div>
    </div>
  )
}