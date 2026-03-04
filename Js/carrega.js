//importar arquivo

import { produtos } from "./produtos.js";

//pegando elementos do dom 

const divCards = document.querySelector("#container-produtos")

const criarcards = () => {
     //LIMPAR ELA

     divCards.innerHTML = ''

     produtos.forEach((elem, i) => {

        //CRIAR A DIV 
        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')
        //personalização da div
        divCard.innerHTML = `<img src="${elem.caminhoImagem}" alt="${elem.descricao}">
            <h3 class="card-titulo">${elem.descricao}</h3>
            <p class="card-descricao">${elem.descricaoDetalhada}</p>
            <p class="card-preco"> R$: ${elem.valorUnitario} / ${elem.unidade}</p>`

            //Criando  BOTAO

            const btnADD = document.createElement('button')
            btnADD.innerHTML = 'adicionar'
            btnADD.classList.add('card-botao')
            btnADD.addEventListener('click', () =>{
                alert('RECURSO EM CONSTRUÇÃO')
            } )

            divCard.appendChild(btnADD)

            divCards.appendChild(divCard)

     })
}

const criarMenuSecoes = () =>{

    const mapSecoes = new Map()
    produtos.forEach(elem => {
        mapSecoes.set(elem.secao.idSecao, elem)
    })

    const secoesSelecionadas = Array.from(mapSecoes.values())

    return secoesSelecionadas
}





criarcards()