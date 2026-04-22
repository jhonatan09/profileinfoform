import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProfessionalStep } from './index'
import { useFormStore } from '../../store/formStore'
import { getProfessions } from '../../services/professionService'

jest.mock('../../store/formStore', () => ({
  useFormStore: jest.fn(),
}))

jest.mock('../../services/professionService', () => ({
  getProfessions: jest.fn(),
}))

jest.mock('../../../../components/Stepper', () => ({
  Stepper: () => <div data-testid="stepper" />,
}))

describe('ProfessionalStep', () => {
  const setProfessional = jest.fn()
  const nextStep = jest.fn()
  const prevStep = jest.fn()
  const mockProfessions = ['Desenvolvedor', 'Designer']

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getProfessions as jest.Mock).mockResolvedValue(mockProfessions)

    ;(useFormStore as unknown as jest.Mock).mockReturnValue({
      professional: { jobs: [] },
      setProfessional,
      nextStep,
      prevStep,
    })
  })

  it('Deve cobrir o branch de dados existentes no store referente as informações profissionais', async () => {
    const mockData = {
      jobs: [{
        company: 'Google',
        profession: 'Designer',
        salary: '10000',
        timeInCompany: '5',
        isCurrent: true
      }]
    }

    ;(useFormStore as unknown as jest.Mock).mockReturnValue({
      professional: mockData,
      setProfessional,
      nextStep,
      prevStep,
    })

    render(<ProfessionalStep />)


    await screen.findByRole('option', { name: 'Designer' })


    expect(screen.getByDisplayValue('Google')).toBeInTheDocument()

    const select = screen.getByRole('combobox')
    await userEvent.selectOptions(select, 'Designer')
    
    expect((select as HTMLSelectElement).value).toBe('Designer')
  })

 

  it('Deve submeter com sucesso e avançar o step', async () => {
    const user = userEvent.setup()
    render(<ProfessionalStep />)
    
    await screen.findByText('Desenvolvedor')

    await user.type(screen.getByPlaceholderText('Empresa'), 'Microsoft')
    await user.selectOptions(screen.getByRole('combobox'), 'Desenvolvedor')
    await user.type(screen.getByPlaceholderText('Salário'), '8000')
    await user.type(screen.getByPlaceholderText('Tempo de empresa (anos)'), '4')
    
    await user.click(screen.getByRole('button', { name: /finalizar/i }))

    await waitFor(() => {
      expect(setProfessional).toHaveBeenCalled()
      expect(nextStep).toHaveBeenCalled()
    })
  })
})