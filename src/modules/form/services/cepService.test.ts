import { getAddressByCep } from './cepService'


global.fetch = jest.fn()

describe('getAddressByCep', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve retornar os dados formatados corretamente ao encontrar um CEP', async () => {
        const mockResponse = {
            logradouro: 'Praça da Sé',
            bairro: 'Sé',
            localidade: 'São Paulo',
            uf: 'SP',
        }

            ; (fetch as jest.Mock).mockResolvedValue({
                json: jest.fn().mockResolvedValue(mockResponse),
            })

        const result = await getAddressByCep('01001-000')

        expect(result).toEqual({
            street: 'Praça da Sé',
            neighborhood: 'Sé',
            city: 'São Paulo',
            state: 'SP',
        })

        expect(fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/')
    })

    it('Deve lançar um erro quando o CEP não for encontrado', async () => {
        ; (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue({ erro: true }),
        })

        await expect(getAddressByCep('00000-000')).rejects.toThrow('CEP não encontrado')
    })

    it('Deve falhar se houver um erro de rede', async () => {
        ; (fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

        await expect(getAddressByCep('12345678')).rejects.toThrow('Network error')
    })
})