import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { FormMaskedInput } from './FormMaskedInput'
import { useEffect } from 'react'


const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({ defaultValues: { cpf: '' } })
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('FormMaskedInput', () => {
  it('Deve aplicar a máscara de CPF corretamente', async () => {
    render(
      <Wrapper>
        <FormMaskedInput 
          name="cpf" 
          mask="000.000.000-00" 
          placeholder="Digite seu CPF" 
        />
      </Wrapper>
    )

    const input = screen.getByPlaceholderText('Digite seu CPF') as HTMLInputElement
    
    
    fireEvent.input(input, { target: { value: '12345678901' } })


    expect(input.value).toBe('123.456.789-01')
  })

  it('Deve exibir mensagem de erro quando o campo estiver inválido', async () => {
    const ErrorWrapper = () => {
      const methods = useForm({
        defaultValues: { test: '' },
      })
      
  
      useEffect(() => {
        methods.setError('test', { 
          type: 'manual', 
          message: 'CPF obrigatório' 
        })
      }, [methods])

      return (
        <FormProvider {...methods}>
          <FormMaskedInput 
            name="test" 
            mask="000.000.000-00" 
            placeholder="CPF" 
          />
        </FormProvider>
      )
    }

    render(<ErrorWrapper />)

    const errorMsg = await screen.findByText('CPF obrigatório')
    expect(errorMsg).toBeInTheDocument()
    
    const input = screen.getByPlaceholderText('CPF')
    expect(input).toHaveClass('border-red-500')
  })
})