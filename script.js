document.addEventListener('DOMContentLoaded', function() {
    const tabelaPeriodica = document.getElementById('tabela-periodica');
    const detalhesElemento = document.getElementById('detalhes-elemento');

    const url = 'https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json';

    // Objeto para traduzir as categorias da API (inglês) para as classes do CSS (português)
    const mapaCategorias = {
        'alkali metal': 'metal-alcalino',
        'alkaline earth metal': 'metal-alcalinoterroso',
        'lanthanide': 'lantanideo',
        'actinide': 'actinideo',
        'transition metal': 'metal-de-transicao',
        'post-transition metal': 'metal-pos-transicao',
        'metalloid': 'metaloide',
        'diatomic nonmetal': 'nao-metal-diatomico',
        'polyatomic nonmetal': 'nao-metal-poliatomico',
        'noble gas': 'gas-nobre'
    };
    
    // Função para obter a classe da categoria em português
    function traduzirCategoria(categoria) {
        const categoriaLimpa = categoria.toLowerCase().split(',')[0].trim();
        return mapaCategorias[categoriaLimpa] || 'desconhecido';
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const elementos = data.elements;
            elementos.forEach(elemento => {
                const elementoDiv = document.createElement('div');
                const classeCategoria = traduzirCategoria(elemento.category);
                
                elementoDiv.className = `elemento ${classeCategoria}`;
                elementoDiv.style.gridColumn = elemento.xpos;
                elementoDiv.style.gridRow = elemento.ypos;

                elementoDiv.innerHTML = `
                    <div class="numero-atomico">${elemento.number}</div>
                    <div class="simbolo">${elemento.symbol}</div>
                    <div class="nome">${elemento.name}</div>
                    <div class="massa-atomica">${elemento.atomic_mass.toFixed(3)}</div>
                `;

                elementoDiv.addEventListener('click', () => {
                    exibirDetalhesElemento(elemento);
                });

                tabelaPeriodica.appendChild(elementoDiv);
            });
        })
        .catch(error => console.error('Erro ao buscar dados da tabela periódica:', error));

    function exibirDetalhesElemento(elemento) {
        detalhesElemento.style.display = 'flex';

        const caixaElementoDetalhe = document.getElementById('caixa-elemento-detalhe');
        const classeCategoria = traduzirCategoria(elemento.category);
        
        caixaElementoDetalhe.className = `elemento ${classeCategoria}`;
        caixaElementoDetalhe.innerHTML = `
            <div class="numero-atomico">${elemento.number}</div>
            <div class="simbolo">${elemento.symbol}</div>
            <div class="nome">${elemento.name}</div>
            <div class="massa-atomica">${elemento.atomic_mass.toFixed(3)}</div>
        `;

        document.getElementById('nome-elemento-detalhe').textContent = elemento.name;
        document.getElementById('numero-atomico-detalhe').textContent = elemento.number;
        document.getElementById('simbolo-detalhe').textContent = elemento.symbol;
        document.getElementById('massa-atomica-detalhe').textContent = elemento.atomic_mass.toFixed(3);
        document.getElementById('grupo-detalhe').textContent = elemento.xpos;
        document.getElementById('periodo-detalhe').textContent = elemento.ypos;
        document.getElementById('configuracao-eletronica-detalhe').textContent = elemento.electron_configuration_semantic;
        document.getElementById('fase-detalhe').textContent = elemento.phase;
        document.getElementById('categoria-detalhe').textContent = elemento.category;

        detalhesElemento.scrollIntoView({ behavior: 'smooth' });
    }
});
