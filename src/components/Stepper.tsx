import { useFormStore } from '../modules/form/store/formStore'
import { AiOutlineCheck } from "react-icons/ai";

export const Stepper = () => {
  const step = useFormStore((s) => s.step)

  const steps = [1, 2, 3, 4]

  return (
    <div className="flex items-center justify-between mb-6 pl-16">
      {steps.map((s, index) => (
        <div key={s} className="flex items-center w-full">

        
          <div
            className={`
              w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium
              transition-all duration-300
              ${step >= s
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-500'}
            `}
          >
            {s === 4 ? <AiOutlineCheck /> : s}
          </div>

         
          {index < steps.length - 1 && (
            <div
              className={`
                flex-1 h-1 mx-2 rounded transition-all duration-300
                ${step > s ? 'bg-blue-600' : 'bg-gray-300'}
              `}
            />
          )}

        </div>
      ))}
    </div>
  )
}