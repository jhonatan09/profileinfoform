import { create } from 'zustand'
import type { Step, FormStore } from '../types'





export const useFormStore = create<FormStore>((set) => ({
    step: 0,
    personal: {},
    address: {},
    professional: {
        jobs: [],
    },

    setStep: (step) => set({ step }),

    nextStep: () =>
        set((state) => ({
            step: state.step < 4 ? ((state.step + 1) as Step) : state.step,
        })),

    prevStep: () =>
        set((state) => ({
            step: state.step > 1 ? ((state.step - 1) as Step) : state.step,
        })),

    setPersonal: (data) => set({ personal: data }),

    setAddress: (data) =>
        set((state) => ({
            address: {
                ...state.address,
                ...data,
            },
        })),

    setProfessional: (data) =>
        set((state) => ({
            professional: {
                ...state.professional,
                ...data,
            },
        })),
}))