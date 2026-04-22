import { useFormStore } from '../../store/formStore'
import { AiOutlineSolution } from "react-icons/ai";

export const WelcomeStep = () => {
  const { setStep } = useFormStore()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">

      <div className="max-w-xl w-full text-center">

       
        <div className="mb-6 inline-flex items-center justify-center px-4 py-1 rounded-full bg-white/10 backdrop-blur text-base">
        <AiOutlineSolution />
           Formulário de cadastro profissional
        </div>

    
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          Crie seu cadastro profissional
          <span className="text-blue-400"> em minutos</span>
        </h1>


        <p className="text-gray-300 mb-8">
          Um processo simples, rápido e inteligente para organizar suas informações com segurança.
        </p>

        <div className="flex flex-col items-center gap-3 mb-10">

          <div className="flex items-center gap-2">
            <p className="text-gray-300">
              Preenchimento rápido e guiado
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-gray-300">
              Seus dados protegidos
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-gray-300">
              Exportação profissional em PDF
            </p>
          </div>

        </div>


        <button
          onClick={() => setStep(1)}
          className="
            bg-blue-600 px-6 py-3 rounded-xl text-white font-medium
            hover:bg-blue-700 active:scale-95
            transition-all duration-200
            shadow-lg hover:shadow-xl
          "
        >
          Começar cadastro
        </button>

      </div>
    </div>
  )
}