import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  stepKey: number
}

export const StepTransition = ({ children, stepKey }: Props) => {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}