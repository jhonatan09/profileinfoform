import jsPDF from 'jspdf'
import type { PersonalData, AddressData, ProfessionalData } from '../types'

type Props = {
    personal: Partial<PersonalData>
    address: Partial<AddressData>
    professional: Partial<ProfessionalData>
}

export const generateSummaryPDF = ({
    personal,
    address,
    professional,
}: Props) => {
    const pdf = new jsPDF()

    const pageWidth = 210
    let y = 0


    pdf.setFillColor(37, 99, 235)
    pdf.rect(0, 0, pageWidth, 30, 'F')

    pdf.setTextColor(255)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(16)
    pdf.text('Cadastro profissional', 20, 18)


    y = 40


    const drawCard = (title: string, content: () => void) => {
        const startY = y

        pdf.setFillColor(245, 245, 245)
        pdf.roundedRect(15, startY, 180, 10, 4, 4, 'F')

        pdf.setTextColor(0)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(13)
        pdf.text(title, 20, startY + 7)

        y = startY + 15

        content()

        y += 10
    }


    const line = (label: string, value?: string) => {
        if (!value) return

        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(10)
        pdf.setTextColor(80)
        pdf.text(label, 20, y)

        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(0)
        pdf.text(value, 80, y)

        y += 6
    }


    drawCard('Dados Pessoais', () => {
        line('Nome', personal.name)
        line('CPF', personal.cpf)
        line('Email', personal.email)
        line('Telefone', personal.phone)
    })


    drawCard('Endereço', () => {
        line('Endereço', `${address.street}, ${address.number}`)
        line('Bairro', address.neighborhood)
        line('Cidade', `${address.city} - ${address.state}`)
        line('CEP', address.cep)
        if (address.complement) {
            line('Complemento', address.complement)
        }
    })


    drawCard('Profissional', () => {
        if (!professional.jobs?.length) return

        professional.jobs.forEach((job, index) => {
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(11)
            pdf.setTextColor(40)
            pdf.text(`Experiência ${index + 1}`, 20, y)

            y += 5

            line('Empresa', job.company)
            line('Profissão', job.profession)
            line('Salário', job.salary)

            line('Tempo de empresa', `${job.timeInCompany} anos`)

            if (job.isCurrent) {
                pdf.setTextColor(0, 150, 0)
                pdf.text('Empresa atual', 20, y)
                pdf.setTextColor(0)
                y += 6
            }

            y += 4
        })
    })


    pdf.setDrawColor(220)
    pdf.line(20, 280, 190, 280)

    pdf.setFontSize(9)
    pdf.setTextColor(120)
    pdf.text(
        `Gerado em ${new Date().toLocaleDateString()}`,
        20,
        287
    )

    pdf.text('Sistema de Cadastro', 120, 287)

    pdf.save('cadastro-profissional.pdf')
}