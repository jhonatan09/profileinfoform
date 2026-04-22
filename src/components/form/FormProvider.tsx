import { FormProvider as RHFProvider, type UseFormReturn } from 'react-hook-form'

type Props = {
  children: React.ReactNode
  methods: UseFormReturn<any>
}

export const FormProvider = ({ children, methods }: Props) => {
  return <RHFProvider {...methods}>{children}</RHFProvider>
}