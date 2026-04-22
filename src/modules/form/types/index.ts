export type PersonalData = {
    name: string
    birthDate: string
    cpf: string
    phone: string
    email: string
}

export type AddressData = {
    cep: string
    street: string
    neighborhood: string
    city: string
    state: string
    number: string
    complement: string
}


export type FormStore = {
    step: Step
    personal: Partial<PersonalData>
    address: Partial<AddressData>
    professional: Partial<ProfessionalData>

    setAddress: (data: Partial<AddressData>) => void
    setPersonal: (data: PersonalData) => void
    setProfessional: (data: Partial<ProfessionalData>) => void

    setStep: (step: Step) => void
    nextStep: () => void
    prevStep: () => void
}

export type ProfessionalData = {
    jobs: {
        company: string
        profession: string
        salary: string
        timeInCompany: string
        isCurrent: boolean
    }[]
}

export type Step = 0 | 1 | 2 | 3 | 4