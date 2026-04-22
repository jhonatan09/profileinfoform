import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PersonalStep } from './index'
import { useFormStore } from '../../store/formStore'


jest.mock('../../store/formStore', () => ({
  useFormStore: jest.fn(),
}))


jest.mock('../../../../components/Stepper', () => ({
  Stepper: () => <div data-testid="stepper" />,
}))



describe('PersonalStep', () => {
  const setPersonal = jest.fn()
  const nextStep = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(useFormStore as unknown as jest.Mock).mockReturnValue({
      personal: {},
      setPersonal,
      nextStep,
    })
  })

  it('Deve renderizar o formulário', () => {
    render(<PersonalStep />)

    expect(screen.getByText(/dados pessoais/i)).toBeInTheDocument()
  })

  it('Formulário deve ser submetido quando estiver válido', async () => {
    const user = userEvent.setup()

    render(<PersonalStep />)


    await user.type(screen.getByPlaceholderText('Nome completo'), 'Jhonny')
    await user.type(screen.getByPlaceholderText('Data de nascimento'), '01012000')
    await user.type(screen.getByPlaceholderText('CPF'), '12345678900')
    await user.type(screen.getByPlaceholderText('Telefone'), '11999999999')
    await user.type(screen.getByPlaceholderText('Email'), 'jhonny@test.com')

    await user.click(screen.getByRole('button', { name: /próximo/i }))

    expect(setPersonal).toHaveBeenCalledTimes(1)
    expect(nextStep).toHaveBeenCalledTimes(1)
  })

  it('Não deve ser submetido quando estiver vazio', async () => {
    const user = userEvent.setup()

    render(<PersonalStep />)

    await user.click(screen.getByRole('button', { name: /próximo/i }))

    expect(setPersonal).not.toHaveBeenCalled()
    expect(nextStep).not.toHaveBeenCalled()
  })
})