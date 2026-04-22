import { render, screen } from '@testing-library/react'
import { FormInput } from './FormInput'
import { useFormField } from './useFormField'


jest.mock('./useFormField')

describe('FormInput', () => {
  const name = 'email'
  const placeholder = 'Digite seu e-mail'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Deve renderizar o input com o placeholder correto', () => {

    ;(useFormField as jest.Mock).mockReturnValue({
      register: { name },
      error: undefined
    })

    render(<FormInput name={name} placeholder={placeholder} />)

    const input = screen.getByPlaceholderText(placeholder)
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('border-gray-300')
  })

  it('Deve exibir a mensagem de erro e aplicar a borda vermelha quando houver erro', () => {
    const errorMessage = 'E-mail inválido'
    
   
    ;(useFormField as jest.Mock).mockReturnValue({
      register: { name },
      error: errorMessage
    })

    render(<FormInput name={name} placeholder={placeholder} />)

    
    expect(screen.getByText(errorMessage)).toBeInTheDocument()

    const input = screen.getByPlaceholderText(placeholder)
    expect(input).toHaveClass('border-red-500')
  })
})