import { produtos } from './produtos.js';
console.log(produtos)

const container = document.getElementById("container-produtos");

produtos.forEach(produto => {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${produto.caminhoImagem}" alt="${produto.descricao}">
        <h3>${produto.descricao}</h3>
        <p>${produto.descricaoDetalhada}</p>
        <p class="preco">
            R$ ${produto.valorUnitario.toFixed(2)} / ${produto.unidade}
        </p>
        <button onclick="adicionarCarrinho(${produto.idProduto})">
            Comprar
        </button>
    `;

    container.appendChild(card);
});

function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.idProduto === id);
    alert(`Produto ${produto.descricao} adicionado ao carrinho!`);
}
