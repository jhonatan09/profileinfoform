import { useEffect, useRef, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormStore } from '../../store/formStore'
import { getAddressByCep } from '../../services/cepService'
import { addressSchema, type AddressData } from '../../schemas/address.schema' 
import { Stepper } from '../../../../components/Stepper'

import { FormProvider } from '../../../../components/form/FormProvider'
import { FormInput } from '../../../../components/form/FormInput'
import { FormMaskedInput } from '../../../../components/form/FormMaskedInput'

export const AddressStep = () => {
  const { address, setAddress, nextStep, prevStep } = useFormStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [autoFilled, setAutoFilled] = useState(false)
  const lastRequestedCep = useRef('')

  const methods = useForm<AddressData>({
    defaultValues: address as unknown as AddressData, 
    resolver: zodResolver(addressSchema),
    mode: 'onBlur',
  })

  const { handleSubmit, setValue, watch } = methods
  const cepValue = watch('cep')

  const fetchCep = async (value: string) => {
    if (!value) return
    const cleaned = value.replace(/\D/g, '')

    if (cleaned.length !== 8) return
    if (lastRequestedCep.current === cleaned) return

    lastRequestedCep.current = cleaned

    try {
      setLoading(true)
      setError('')

      const result = await getAddressByCep(cleaned)

      setValue('street', result.street, { shouldValidate: true })
      setValue('neighborhood', result.neighborhood, { shouldValidate: true })
      setValue('city', result.city, { shouldValidate: true })
      setValue('state', result.state, { shouldValidate: true })

      setAutoFilled(true)
    } catch (err) {
      setError('CEP não encontrado')
      setAutoFilled(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCep(cepValue)
  }, [cepValue])

  const handleCepChange = (value: string) => {
    setValue('cep', value, { shouldValidate: true })
  }

  const onSubmit: SubmitHandler<AddressData> = (data) => {
    setAddress(data as any) 
    nextStep()
  }

  const autoFillStyle = autoFilled ? 'bg-green-50/50 rounded-lg p-1 transition-colors' : ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Stepper />

        <FormProvider methods={methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold mb-1">Endereço</h2>
            <p className="text-sm text-gray-500 mb-4">
              Digite seu CEP para preencher automaticamente
            </p>

            <div className="mb-4">
              <FormMaskedInput
                name="cep"
                mask="00000-000"
                placeholder="CEP"
                onAccept={handleCepChange}
              />
            </div>

            {loading && (
              <div className="text-sm text-blue-600 mb-4 animate-pulse">
                Buscando endereço...
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-2 rounded mb-4 border border-red-100">
                {error}
              </div>
            )}

            <div className={`space-y-3 ${autoFillStyle}`}>
              <FormInput name="street" placeholder="Endereço" />

              <div className="grid grid-cols-2 gap-3">
                <FormInput name="number" placeholder="Número" />
                <FormInput name="complement" placeholder="Complemento" />
              </div>

              <FormInput name="neighborhood" placeholder="Bairro" />
              <FormInput name="city" placeholder="Cidade" />
              <FormInput name="state" placeholder="Estado" />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Voltar
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-all active:scale-95 shadow-md"
              >
                Próximo
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}