import { render, screen, fireEvent } from '@testing-library/react'
import { SummaryStep } from './index'
import { useFormStore } from '../../store/formStore'
import { generateSummaryPDF } from '../../services/pdfService'



jest.mock('../../store/formStore')
jest.mock('../../services/pdfService', () => ({
    generateSummaryPDF: jest.fn()
  }))
jest.mock('../../../../components/Stepper', () => ({
  Stepper: () => <div data-testid="stepper" />
}))

describe('SummaryStep', () => {
  const mockSetStep = jest.fn()
  
  const mockStoreData = {
    personal: {
      name: 'John Doe',
      cpf: '123.456.789-00',
      email: 'john@example.com',
      phone: '(11) 99999-9999'
    },
    address: {
      street: 'Rua A',
      number: '123',
      neighborhood: 'Bairro B',
      city: 'Cidade C',
      state: 'SP',
      cep: '01234-567'
    },
    professional: {
      jobs: [
        {
          company: 'Tech Corp',
          profession: 'Developer',
          salary: '5000',
          timeInCompany: '2',
          isCurrent: true
        }
      ]
    },
    setStep: mockSetStep
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useFormStore as unknown as jest.Mock).mockReturnValue(mockStoreData)
  })

  it('Deve renderizar todos os dados do resumo corretamente', () => {
    render(<SummaryStep />)

   
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
    expect(screen.getByText(/123.456.789-00/i)).toBeInTheDocument()

    expect(screen.getByText(/Rua A, 123/i)).toBeInTheDocument()
    expect(screen.getByText(/Cidade C - SP/i)).toBeInTheDocument()

  
    expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument()
    expect(screen.getByText(/Developer/i)).toBeInTheDocument()
    expect(screen.getByText(/Empresa atual/i)).toBeInTheDocument()
  })

  it('deve chamar setStep com o valor correto ao clicar nos botões de editar', () => {
    render(<SummaryStep />)

    const editButtons = screen.getAllByRole('button', { name: /editar/i })

    
    fireEvent.click(editButtons[0])
    expect(mockSetStep).toHaveBeenCalledWith(1)

    fireEvent.click(editButtons[1])
    expect(mockSetStep).toHaveBeenCalledWith(2)

   
    fireEvent.click(editButtons[2])
    expect(mockSetStep).toHaveBeenCalledWith(3)
  })

  it('Deve chamar a função de gerar PDF com os dados corretos', () => {
    render(<SummaryStep />)

    const exportButton = screen.getByRole('button', { name: /exportar pdf/i })
    fireEvent.click(exportButton)

    expect(generateSummaryPDF).toHaveBeenCalledWith({
      personal: mockStoreData.personal,
      address: mockStoreData.address,
      professional: mockStoreData.professional
    })
  })

  it('Deve renderizar múltiplos jobs se existirem', () => {
    const multiJobStore = {
      ...mockStoreData,
      professional: {
        jobs: [
          { company: 'Google', profession: 'Designer', salary: '8000', timeInCompany: '1', isCurrent: false },
          { company: 'Meta', profession: 'Manager', salary: '12000', timeInCompany: '3', isCurrent: true }
        ]
      }
    }
    ;(useFormStore as unknown as jest.Mock).mockReturnValue(multiJobStore)

    render(<SummaryStep />)

    expect(screen.getByText(/Google/i)).toBeInTheDocument()
    expect(screen.getByText(/Meta/i)).toBeInTheDocument()
    expect(screen.getByText(/Manager/i)).toBeInTheDocument()
  })
})