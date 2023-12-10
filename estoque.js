let estoque = {
    'joao': [
        { 'tipo': 'maca', 'quantidade': 1 },
    ],
    'maria': [
        { 'tipo': 'maca', 'quantidade': 2 },
    ]
};

function getEstoque() {
    return structuredClone(estoque);
}

function transacaoNoEstoque(origem, destino, tipo, qtd) {
    if (origem === destino) { return; }
    if (destino === "pomar") {
        dePessoaParaPomar(origem, tipo, qtd);
        return;
    }

    if (origem === "pomar") {
        dePomarParaPessoa(destino, tipo, qtd)
        return;
    }

    dePessoaParaPessoa(origem, destino, tipo, qtd);
}

function dePessoaParaPessoa(origem, destino, tipo, qtd) {
    const pessoaOrigem = estoque[origem];
    const pessoaDestino = estoque[destino];
    let monteOrigem;
    for (let i = 0; i < pessoaOrigem.length; i++) {
        const monte = pessoaOrigem[i];
        if (monte.tipo === tipo) {
            monteOrigem = monte;
            break;
        }
    }
    if (monteOrigem === undefined) { return; }
    let monteDestino;
    for (let i = 0; i < pessoaDestino.length; i++) {
        const monte = pessoaDestino[i];
        if (monte.tipo === tipo) {
            monteDestino = monte;
            break;
        }
    }
    if (!monteDestino) {
        monteDestino = { 'tipo': tipo, 'quantidade': 0 };
        pessoaDestino.push(monteDestino);
    }
    const qtdReal = Math.min(qtd, monteOrigem.quantidade);
    monteDestino.quantidade += qtdReal;
    monteOrigem.quantidade -= qtdReal
}

function dePessoaParaPomar(origem, tipo, qtd) {
    const pessoa = estoque[origem];
    for (let i = 0; i < pessoa.length; i++) {
        const monte = pessoa[i];
        if (monte.tipo === tipo) {
            monte.quantidade -= Math.min(qtd, monte.quantidade);
            return;
        }
    }
}

function dePomarParaPessoa(destino, tipo, qtd) {
    const pessoa = estoque[destino];
    for (let i = 0; i < pessoa.length; i++) {
        const monte = pessoa[i];
        if (monte.tipo === tipo) {
            monte.quantidade += Math.max(qtd, 0);
            return;
        }
    }
    const novoMonte = { 'tipo': tipo, 'quantidade': Math.max(qtd, 0) };
    pessoa.push(novoMonte);
}

function limpaEstoque(){
    for(let pessoa in estoque){
        estoque[pessoa] = [];
    }
}

export { getEstoque, transacaoNoEstoque, limpaEstoque };