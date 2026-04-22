import { useFormStore } from './modules/form/store/formStore'

import { WelcomeStep } from './modules/form/steps/WelcomeStep'
import { PersonalStep } from './modules/form/steps/PersonalStep'
import { AddressStep } from './modules/form/steps/AddressStep'
import { ProfessionalStep } from './modules/form/steps/ProfessionalStep'
import { SummaryStep } from './modules/form/steps/SummaryStep'

import { AnimatePresence } from 'framer-motion'
import { StepTransition } from './components/StepTransition'

function App() {
  const step = useFormStore((state) => state.step)

  return (
    <AnimatePresence mode="wait">

      {step === 0 && (
        <StepTransition stepKey={0}>
          <WelcomeStep />
        </StepTransition>
      )}

      {step === 1 && (
        <StepTransition stepKey={1}>
          <PersonalStep />
        </StepTransition>
      )}

      {step === 2 && (
        <StepTransition stepKey={2}>
          <AddressStep />
        </StepTransition>
      )}

      {step === 3 && (
        <StepTransition stepKey={3}>
          <ProfessionalStep />
        </StepTransition>
      )}

      {step === 4 && (
        <StepTransition stepKey={4}>
          <SummaryStep />
        </StepTransition>
      )}

    </AnimatePresence>
  )
}

export default App