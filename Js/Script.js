const botoesCategorias = document.querySelectorAll('.categorias button')

botoesCategorias.forEach(botao => {
    botao.addEventListener('click', () => {

        // remove ativo de todos
        botoesCategorias.forEach(btn => btn.classList.remove('ativo'))

        // adiciona no clicado
        botao.classList.add('ativo')
    })
})