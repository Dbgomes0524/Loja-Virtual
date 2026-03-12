let cart = [];
const save = localStorage.getItem("carrinho");

if (save) {
    cart = JSON.parse(save);
}

const containerPai = document.getElementById('lista-produtos');

// Função principal que desenha a lista inteira na tela
const renderizarLista = () => {
    containerPai.innerHTML = ''; 

    cart.forEach((objeto, index) => { 
        const showlist = document.createElement('div');
        showlist.classList.add('item');

        showlist.innerHTML = `
            <img src="${objeto.img}" alt="${objeto.desc}">
                <h3>${objeto.desc}</h3>
                <p>R$ ${objeto.valor} ${objeto.uni}</p>
            
            <input type="number" value="${objeto.qtd}" min="1" data-index="${index}" class="input-qtd">
            
                <span>${objeto.qtd}</span>
            </div>
            
            <button class="btn-remover" data-index="${index}">&#10006;</button>
        `;

        containerPai.appendChild(showlist);
    });

    atualizarResumo();
}

const atualizarResumo = () => {
    let subtotal = 0;
    const valorFrete = 5.00;

    cart.forEach(objeto => {
        let precoAjustado = objeto.valor.toString().replace(',', '.');
        let precoNumerico = parseFloat(precoAjustado);
        let quantidade = parseInt(objeto.qtd);
        subtotal += (precoNumerico * quantidade);
    });

    let total = cart.length > 0 ? subtotal + valorFrete : 0;

    document.getElementById('valorcaixa').innerText = subtotal.toFixed(2).replace('.', ',');
    document.getElementById('valortotal').innerText = total.toFixed(2).replace('.', ',');
}
renderizarLista();