import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddressStep } from './index'
import { useFormStore } from '../../store/formStore'
import { getAddressByCep } from '../../services/cepService'

jest.mock('../../store/formStore', () => ({
  useFormStore: jest.fn(),
}))

jest.mock('../../services/cepService', () => ({
  getAddressByCep: jest.fn(),
}))

jest.mock('../../../../components/Stepper', () => ({
  Stepper: () => <div data-testid="stepper" />,
}))

describe('AddressStep', () => {
  const setAddress = jest.fn()
  const nextStep = jest.fn()
  const prevStep = jest.fn()

  const mockAddressData = {
    street: 'Rua Teste',
    neighborhood: 'Bairro Teste',
    city: 'Cidade Teste',
    state: 'SP',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useFormStore as unknown as jest.Mock).mockReturnValue({
      address: {},
      setAddress,
      nextStep,
      prevStep,
    })
  })

  it('deve renderizar o formulário de endereço corretamente', () => {
    render(<AddressStep />)
    expect(screen.getByText(/Endereço/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('CEP')).toBeInTheDocument()
  })

  it('deve preencher os campos automaticamente ao digitar um CEP válido', async () => {
    const user = userEvent.setup()
    ;(getAddressByCep as jest.Mock).mockResolvedValue(mockAddressData)

    render(<AddressStep />)

    const cepInput = screen.getByPlaceholderText('CEP')
    await user.type(cepInput, '12345678')

    await waitFor(() => {
      expect(getAddressByCep).toHaveBeenCalledWith('12345678')
    })

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Endereço')).toHaveValue(mockAddressData.street)
      expect(screen.getByPlaceholderText('Estado')).toHaveValue(mockAddressData.state)
    })
  })

  it('deve exibir validações do Zod quando tentar avançar com campos inválidos', async () => {
    const user = userEvent.setup()
    render(<AddressStep />)

    const nextButton = screen.getByRole('button', { name: /próximo/i })
    await user.click(nextButton)

    await waitFor(() => {
      const errorMessages = screen.getAllByText(/Obrigatório|invalid|UF inválida/i)
      expect(errorMessages.length).toBeGreaterThan(0)
    })


    const cepInput = screen.getByPlaceholderText('CEP')
    await user.type(cepInput, '123')
    

    await user.click(nextButton)

    await waitFor(() => {
      expect(screen.getByText(/CEP incompleto/i)).toBeInTheDocument()
    })
  })

  it('deve exibir mensagem de erro quando o CEP não for encontrado', async () => {
    const user = userEvent.setup()
    ;(getAddressByCep as jest.Mock).mockRejectedValue(new Error('CEP não encontrado'))

    render(<AddressStep />)

    const cepInput = screen.getByPlaceholderText('CEP')
    await user.type(cepInput, '00000000')

    await waitFor(() => {
      expect(screen.getByText(/CEP não encontrado/i)).toBeInTheDocument()
    })
  })

  it('deve enviar o formulário e avançar para o próximo passo quando válido', async () => {
    const user = userEvent.setup()
    ;(getAddressByCep as jest.Mock).mockResolvedValue(mockAddressData)

    render(<AddressStep />)

    await user.type(screen.getByPlaceholderText('CEP'), '12345678')
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Endereço')).toHaveValue(mockAddressData.street)
    })
    
    await user.type(screen.getByPlaceholderText('Número'), '123')

    const nextButton = screen.getByRole('button', { name: /próximo/i })
    await user.click(nextButton)

    await waitFor(() => {
      expect(setAddress).toHaveBeenCalled()
      expect(nextStep).toHaveBeenCalled()
    })
  })

  it('deve chamar prevStep ao clicar no botão Voltar', async () => {
    const user = userEvent.setup()
    render(<AddressStep />)

    const backButton = screen.getByRole('button', { name: /voltar/i })
    await user.click(backButton)

    expect(prevStep).toHaveBeenCalledTimes(1)
  })
})