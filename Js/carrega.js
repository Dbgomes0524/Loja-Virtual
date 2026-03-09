import { produtos } from "./produtos.js";
/*
fetch("produtos.json")

fetch("produtos.json")
.then(produtos => produtos.json())
.then(dados => {
    console.log(dados);
});
*/

// Pegando elementos do DOM
const divCards = document.querySelector("#container-produtos");
const categoriasContainer = document.querySelector(".categorias");
const pesquisar = document.querySelector("#pesquisar");
const botoesCategorias = document.querySelectorAll('.categorias button');


// Função responsável por renderizar os produtos na tela
const criarCards = (listaProdutos) => {
    // Se a lista estiver vazia ou o container não existir, para a execução
    if (!divCards) return;

    // Limpa os cards atuais antes de desenhar novos
    divCards.innerHTML = '';

    listaProdutos.forEach((elem) => {
        // Criar a DIV principal do Card
        const divCard = document.createElement('div');
        divCard.classList.add('card');

        // Personalização da div (Template Literal)
        divCard.innerHTML = `
            <img src="${elem.caminhoImagem}" alt="${elem.descricao}">
            <h3 class="card-titulo">${elem.descricao}</h3>
            <p class="card-descricao">${elem.descricaoDetalhada}</p>
            <p class="card-preco">R$: ${elem.valorUnitario.toFixed(2)} / ${elem.unidade}</p>
        `
        btnAdd.addEventListener('click', () => {
        adicionarAoCarrinho(elem);
        });
        

        // Criando BOTAO de Adicionar
        const btnAdd = document.createElement('button');
        btnAdd.textContent = 'Adicionar';
        btnAdd.classList.add('card-botao');
        
        btnAdd.addEventListener('click', () => {
            alert(`O produto ${elem.descricao} foi adicionado (Recurso em construção)`);
        });

        divCard.appendChild(btnAdd);
        divCards.appendChild(divCard);
    });
};

// Lógica de Filtro por Categoria (Usando os botões que já estão no seu HTML)
if (categoriasContainer) {
    categoriasContainer.addEventListener('click', (evt) => {
        // Evita executar se o clique não for em um botão
        if (evt.target.tagName !== "BUTTON") return;

        const botaoClicado = evt.target;
        const categoriaTexto = botaoClicado.textContent.trim();

        // Gerenciar classe 'ativo' para o CSS mudar a cor
        botoesCategorias.forEach(btn => btn.classList.remove('ativo'));
        botaoClicado.classList.add('ativo');

        // Filtra os produtos
        if (categoriaTexto === 'Todos os Produtos') {
            criarCards(produtos);
        } else {
            const produtosFiltrados = produtos.filter(produto =>
                // Ajuste o caminho abaixo (setor.secao.nomeSecao ou secao.nomeSecao)
                produto.setor.secao.nomeSecao.toLowerCase() === categoriaTexto.toLowerCase()
            );
            criarCards(produtosFiltrados);
        }
    });
}

if (pesquisar) {
    pesquisar.addEventListener('input', () => {
        const buscar = pesquisar.value.toLowerCase();
        
        const filtro = produtos.filter(produto => {
            return produto.descricao.toLowerCase().includes(buscar) || 
                   produto.descricaoDetalhada.toLowerCase().includes(buscar);
        });
        
        criarCards(filtro);
    });
}
criarCards(produtos);