export const getAddressByCep = async (cep: string) => {
    const cleaned = cep.replace(/\D/g, '')

    const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`)
    const data = await res.json()

    if (data.erro) {
        throw new Error('CEP não encontrado')
    }

    return {
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
    }
}