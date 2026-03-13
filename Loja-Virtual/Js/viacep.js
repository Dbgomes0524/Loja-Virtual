//PEGANDO O INPUT CEP
const formulario = document.querySelector('#form_cadastro')
const inputCep = document.querySelector('#cep')

inputCep.addEventListener('input', (evt) => {
    const num = evt.target.value

    if (num.length >= 8) {
        buscaDadosCEP(num.replace('-', ''))
    }

})

const buscaDadosCEP = async (cep) => {

    const api = `https://viacep.com.br/ws/${cep}/json/`

    try {

        const resposta = await fetch(api)
        const dados = await resposta.json()

        if (dados.erro) {
            limparCampos()
            alert("CEP não encontrado")
            return
        }

        preencherEndereco(dados)

    } catch (erro) {
        console.error("Erro ao buscar CEP:", erro)
        alert("Erro ao buscar o CEP")
    }

}

const preencherEndereco = (dados) => {

    document.querySelector("#divEndereco").classList.remove("oculto")
    document.querySelector("#divEndereco").classList.add("form-cadastro")

    const campos = {
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        localidade: dados.localidade,
        uf: dados.uf
    }

    for (let campo in campos) {
        const elemento = document.querySelector(`#${campo}`)

        elemento.value = campos[campo] || ""
        elemento.setAttribute("disabled", "disabled")
    }

    document.querySelector("#numero").focus()
}


const limparCampos = () => {

    const campos = ["logradouro", "bairro", "localidade", "uf"]

    campos.forEach(id => {
        const campo = document.querySelector(`#${id}`)
        campo.value = ""
        campo.removeAttribute("disabled")
    })

    document.querySelector("#logradouro").focus()

}

formulario.addEventListener('reset', () => {
    limparCampos();
    document.querySelector("#divEndereco").classList.add("oculto")
})