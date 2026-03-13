let cart = [];
const save = localStorage.getItem("carrinho");

if (save) {
    cart = JSON.parse(save);
}

const containerPai = document.querySelector('.lista-produtos');

const salvarCarrinho = () => {
    localStorage.setItem("carrinho", JSON.stringify(cart));
}

const atualizarResumoCusto = () => {
    
    // 1. o reduce percorrer meu array 'cart' e somar os valores
    const subtotalItens = cart.reduce((meuAcumulador, objeto) => {
    
        let precoAjustado = parseFloat(objeto.valor.toString().replace(',', '.'));
        
        let valorDoItem = precoAjustado * objeto.qtd;
        
        return meuAcumulador + valorDoItem;
    }, 0); 

    const frete = 5.00;

    const totalAPagar = subtotalItens > 0 ? (subtotalItens + frete) : 0;

    const subtotalFormatado = subtotalItens.toFixed(2).replace('.', ',');
    const totalFormatado = totalAPagar.toFixed(2).replace('.', ',');

    document.getElementById('valorcaixa').innerText = subtotalFormatado;
    document.getElementById('valortotal').innerText = totalFormatado;
}

const renderizarLista = () => {

    containerPai.innerHTML = '';

    cart.forEach((objeto, index) => {

        let precoAjustado = parseFloat(objeto.valor.toString().replace(',', '.'));
        let subtotalItem = (precoAjustado * objeto.qtd).toFixed(2).replace('.', ',');

        const showlist = document.createElement('div');
        showlist.classList.add('item');

        showlist.innerHTML = `
            <img src="${objeto.img}" alt="${objeto.desc}"> 
            <div class="produto-info">
                <h3>${objeto.desc}</h3>
                <p>R$ ${objeto.valor} ${objeto.uni}</p>
            </div>

            <input type="number" 
                   value="${objeto.qtd}" 
                   min="1" 
                   data-index="${index}" 
                   class="input-qtd">

            <span class="preco-item">R$ ${subtotalItem}</span>

            <button class="btn-remover" data-index="${index}">
                ❌
            </button>
        `;

        containerPai.appendChild(showlist);
    });

    atualizarResumoCusto();
}

renderizarLista();

containerPai.addEventListener('click', (e) => {

    if (e.target.classList.contains('btn-remover')) {

        const confirmacao = confirm("Tem certeza que deseja remover este produto do carrinho?");

        if (confirmacao) {
            const index = e.target.dataset.index;

            cart.splice(index, 1);
            
            salvarCarrinho(); 
            renderizarLista(); 
        }
    }

});

containerPai.addEventListener('change', (e) => {

    if (e.target.classList.contains('input-qtd')) {

        const index = e.target.dataset.index;
        const novaQtd = parseInt(e.target.value);

        cart[index].qtd = novaQtd;

        salvarCarrinho();
        renderizarLista();
    }

});