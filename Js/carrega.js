//importar arquivo LEMRAR!!!!
import { produtos } from "./produtos.js";

//pegando a div onde os cards serão inseridos
const divCards = document.querySelector("#container-produtos")

//função responsável por renderizar os produtos na tela
const criarCards = (listaProdutos) => {

    //limpa os cards atuais antes de desenhar novos
    divCards.innerHTML = ''

    criarMenuSecoes()

    listaProdutos.forEach((elem, i) => {

        const divCard = document.createElement('div')
        divCard.classList.add('card')

        divCard.innerHTML = `
            <img src="${elem.caminhoImagem}" alt="${elem.descricao}">
            <h3 class="card-titulo">${elem.descricao}</h3>
            <p class="card-descricao">${elem.descricaoDetalhada}</p>
            <p class="card-preco">R$: ${elem.valorUnitario.toFixed(2)} / ${elem.unidade}</p>
        `

        const btnAdd = document.createElement('button')
        btnAdd.textContent = 'Adicionar'
        btnAdd.classList.add('card-botao')

        btnAdd.addEventListener('click', () =>{
            alert('RECURSO EM CONSTRUÇÃO')
        })

        divCard.appendChild(btnAdd)
        divCards.appendChild(divCard)
    })
}

const filtroSecoes = () => {
    const mapSecoes = new Map()

    listaProdutos.forEach((elem, i) => {
        mapSecoes.set(elem.secao.idSecao, elem)
    })

    const secoes = Array.from(mapSecoes.values())

    return secoes
}



//FUNÇÃO MONTAR MENU SEÇÕES
const criarMenuSecoes = () => {
    const ulMenuSecoes = document.querySelector('.categorias')

    ulMenuSecoes.innerHTML = ''

    filtroSecoes().forEach((elem, i) => {
        const liMenuSecoes = document.createElement('li')

        const aMenuSecao = document.createElement('a')
        aMenuSecao.setAttribute('href', '#')
        aMenuSecao.innerHTML = elem.secao.nomeSecao

        aMenuSecao.addEventListener('click', () => {
            alert('RECURSO EM CONSTRUÇÃO')
        })

        liMenuSecoes.appendChild(aMenuSecao)

        ulMenuSecoes.appendChild(liMenuSecoes)

    })
}



// //Função Filtrar Seções 
    

// const categoriasContainer = document.querySelector(".categorias")

// if(categoriasContainer){
//     categoriasContainer.addEventListener('click', (evt) => {

//         //evita executar o código caso o clique não seja em um botão
//         if(evt.target.tagName !== "BUTTON") return

//         /*
//            pega o texto do botão clicado
//            trim() remove espaços extras
//            toLowerCase() padroniza para minúsculo
//            para facilitar a comparação no filter
//         */
//         const categoria = evt.target.textContent.trim().toLowerCase()

//         if(categoria === 'todos os produtos'){
//             criarCards(produtos)
//             return
//         }

//         /*
//            filter cria um novo array contendo apenas
//            os produtos da seção que foi clicada
//         */
//         const produtosFiltrados = produtos.filter(produto =>
//             produto.setor.secao.nomeSecao.toLowerCase() === categoria
//         )

//         criarCards(produtosFiltrados)
//     })
// }
// const pesquisar = document.querySelector("#pesquisar")

// if(pesquisar){
//     pesquisar.oninput = () => {
//         const buscar = pesquisar.value.toLowerCase();
//         const filtro = produtos.filter(produto =>{
//             return produto.descricao.toLowerCase().includes(buscar)
//         }
//     )
//     criarCards(filtro)
//     }
// }

criarCards()