import { act } from '@testing-library/react'
import { useFormStore } from './formStore'

describe('formStore', () => {
    beforeEach(() => {
        act(() => {
            useFormStore.setState({
                step: 0,
                personal: {},
                address: {},
                professional: { jobs: [] },
            })
        })
    })

    it('Deve atualizar o step corretamente com setStep', () => {
        act(() => {
            useFormStore.getState().setStep(2)
        })
        expect(useFormStore.getState().step).toBe(2)
    })

    it('Deve avançar o step com nextStep, mas não ultrapassar o limite', () => {
        act(() => {
            useFormStore.getState().setStep(3)
            useFormStore.getState().nextStep()
        })
        expect(useFormStore.getState().step).toBe(4)

        act(() => {
            useFormStore.getState().nextStep()
        })
        expect(useFormStore.getState().step).toBe(4)
    })

    it('Deve retroceder o step com prevStep, mas não ser menor que 1', () => {
        act(() => {
            useFormStore.getState().setStep(2)
            useFormStore.getState().prevStep()
        })
        expect(useFormStore.getState().step).toBe(1)

        act(() => {
            useFormStore.getState().prevStep()
        })

        expect(useFormStore.getState().step).toBe(1)
    })

    it('Deve mesclar os dados de endereço com setAddress', () => {
        const initialAddress = { street: 'Rua Antiga' }
        act(() => {
            useFormStore.setState({ address: initialAddress })
            useFormStore.getState().setAddress({ number: '123' })
        })

        expect(useFormStore.getState().address).toEqual({
            street: 'Rua Antiga',
            number: '123'
        })
    })
})