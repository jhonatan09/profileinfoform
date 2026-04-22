import { useFormStore } from '../../store/formStore'
import { Stepper } from '../../../../components/Stepper'
import { generateSummaryPDF } from '../../services/pdfService'

export const SummaryStep = () => {
  const { personal, address, professional, setStep } = useFormStore()

  const handleExportPDF = () => {
    generateSummaryPDF({
      personal,
      address,
      professional,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4 flex justify-center">

      <div className="w-full max-w-2xl">

        <Stepper />

        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                Resumo do Cadastro
              </h2>
              <p className="text-sm text-gray-500">
                Confira suas informações antes de finalizar
              </p>
            </div>

            <button
              onClick={handleExportPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition shadow"
            >
              Exportar PDF
            </button>
          </div>


          <div className="space-y-4">

   
            <div className="bg-gray-50 rounded-xl p-4 border">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">Dados Pessoais</h3>
                <button onClick={() => setStep(1)} className="text-blue-600 text-sm">
                  Editar
                </button>
              </div>

              <div className="text-sm space-y-1">
                <p><strong>Nome:</strong> {personal.name}</p>
                <p><strong>CPF:</strong> {personal.cpf}</p>
                <p><strong>Email:</strong> {personal.email}</p>
                <p><strong>Telefone:</strong> {personal.phone}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">Endereço</h3>
                <button onClick={() => setStep(2)} className="text-blue-600 text-sm">
                  Editar
                </button>
              </div>

              <div className="text-sm space-y-1">
                <p><strong>Endereço:</strong> {address.street}, {address.number}</p>
                <p><strong>Bairro:</strong> {address.neighborhood}</p>
                <p><strong>Cidade:</strong> {address.city} - {address.state}</p>
                <p><strong>CEP:</strong> {address.cep}</p>
              </div>
            </div>

     
            <div className="bg-gray-50 rounded-xl p-4 border">
            <div className="flex justify-between mb-2">
                <h3 className="font-semibold">Profissional</h3>
                <button onClick={() => setStep(3)} className="text-blue-600 text-sm">
                Editar
                </button>
            </div>

            <div className="text-sm space-y-4">
                {professional.jobs?.map((job, index) => (
                <div key={index} className="border-b pb-2 last:border-none">
                    <p><strong>Empresa:</strong> {job.company}</p>
                    <p><strong>Profissão:</strong> {job.profession}</p>
                    <p><strong>Salário:</strong> {job.salary}</p>

                    <p>
                    <strong>Tempo de empresa:</strong> {job.timeInCompany} anos
                    </p>

                    {job.isCurrent && (
                    <span className="text-green-600 text-xs font-medium">
                        Empresa atual
                    </span>
                    )}
                </div>
                ))}
            </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}