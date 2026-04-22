import { render, screen } from '@testing-library/react'
import { FormSelect } from './FormSelect'
import { useFormField } from './useFormField'


jest.mock('./useFormField')

describe('FormSelect', () => {
  const mockOptions = ['Opção 1', 'Opção 2']
  const name = 'testSelect'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Deve renderizar o placeholder e as opções corretamente', () => {
    
    ;(useFormField as jest.Mock).mockReturnValue({
      register: { name },
      error: undefined
    })

    render(
      <FormSelect 
        name={name} 
        options={mockOptions} 
        placeholder="Selecione algo" 
      />
    )

    expect(screen.getByText('Selecione algo')).toBeInTheDocument()
    expect(screen.getByText('Opção 1')).toBeInTheDocument()
    expect(screen.getByText('Opção 2')).toBeInTheDocument()
  })

  it('Deve exibir a mensagem de erro e a classe CSS vermelha quando houver erro', () => {
    
    const errorMessage = 'Campo obrigatório'
    ;(useFormField as jest.Mock).mockReturnValue({
      register: { name },
      error: errorMessage
    })

    render(
      <FormSelect 
        name={name} 
        options={mockOptions} 
        placeholder="Selecione" 
      />
    )

  
    expect(screen.getByText(errorMessage)).toBeInTheDocument()

    
    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveClass('border-red-500')
  })
})