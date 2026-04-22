import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { professionalSchema } from '../../schemas/professional.schema'

import { useFormStore } from '../../store/formStore'
import { getProfessions } from '../../services/professionService'
import { Stepper } from '../../../../components/Stepper'

import { FormProvider } from '../../../../components/form/FormProvider'
import { FormInput } from '../../../../components/form/FormInput'
import { FormMaskedInput } from '../../../../components/form/FormMaskedInput'
import { FormSelect } from '../../../../components/form/FormSelect'

import type { ProfessionalData } from '../../types'

export const ProfessionalStep = () => {
  const { professional, setProfessional, nextStep, prevStep } =
    useFormStore()

  const methods = useForm<ProfessionalData>({
    resolver: zodResolver(professionalSchema),
    defaultValues: {
      jobs: professional.jobs?.length
        ? professional.jobs
        : [
            {
              company: '',
              profession: '',
              salary: '',
              timeInCompany: '',
              isCurrent: true,
            },
          ],
    },
  })

  const { control, handleSubmit, register } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'jobs',
  })

  const [professions, setProfessions] = useState<string[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await getProfessions()
      setProfessions(data)
    }

    load()
  }, [])

  const onSubmit = (data: ProfessionalData) => {
    setProfessional(data)
    nextStep()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Stepper />

        <FormProvider methods={methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold mb-1">
              Informações Profissionais
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Conte um pouco sobre sua carreira
            </p>

     
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="mb-6 p-4 border rounded-xl space-y-3"
                >
                  <FormInput
                    name={`jobs.${index}.company`}
                    placeholder="Empresa"
                  />

                  <FormSelect
                    name={`jobs.${index}.profession`}
                    options={professions}
                    placeholder="Profissão"
                  />

                  <FormMaskedInput
                    name={`jobs.${index}.salary`}
                    placeholder="Salário"
                    mask="R$ num"
                    blocks={{
                      num: {
                        mask: Number,
                        thousandsSeparator: '.',
                        radix: ',',
                        mapToRadix: ['.'],
                        scale: 2,
                      },
                    }}
                  />

               
                  <FormMaskedInput
                    name={`jobs.${index}.timeInCompany`}
                    mask={Number}
                    placeholder="Tempo de empresa (anos)"
                  />

           
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      {...register(`jobs.${index}.isCurrent`)}
                      defaultChecked={false}
                    />
                    Empresa atual
                  </label>

           
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 text-sm"
                  >
                    Remover
                  </button>
                </div>
              )
            })}


            <button
              type="button"
              onClick={() =>
                append({
                  company: '',
                  profession: '',
                  salary: '',
                  timeInCompany: '',
                  isCurrent: false,
                })
              }
              className="mb-4 text-blue-600 text-sm hover:underline"
            >
              + Adicionar empresa
            </button>

     
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="text-gray-600 hover:text-black transition"
              >
                Voltar
              </button>

              <button
                type="submit"
                className="
                  bg-blue-600 text-white px-4 py-2 rounded-lg
                  hover:bg-blue-700 active:scale-95
                  transition-all duration-200
                "
              >
                Finalizar
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}