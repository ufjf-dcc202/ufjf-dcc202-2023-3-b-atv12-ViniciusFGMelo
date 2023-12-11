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

function transacaoNoEstoque(origem, destino, tipo, quantidade) {
    if (!estoque[origem] && origem !== "pomar") {
        estoque[origem] = [];
    }

    if (!estoque[destino] && destino !== "pomar") {
        estoque[destino] = [];
    }

    if (quantidade < 0 || origem === destino) {
        return;
    }

    if (destino === "pomar") {
        dePessoaParaPomar(origem, tipo, quantidade);
    } else if (origem === "pomar") {
        dePomarParaPessoa(destino, tipo, quantidade);
    } else {
        dePessoaParaPessoa(origem, destino, tipo, quantidade);
    }
}

function dePessoaParaPessoa(origem, destino, tipo, quantidade) {
    const itemOrigem = estoque[origem].find(item => item.tipo === tipo);
    let itemDestino = estoque[destino].find(item => item.tipo === tipo);

    if (!itemOrigem) {
        return;
    }

    if (itemOrigem.quantidade < quantidade) {
        if (itemDestino) {
            itemDestino.quantidade += itemOrigem.quantidade;
        } else {
            estoque[destino].push({ tipo: tipo, quantidade: itemOrigem.quantidade });
        }
        itemOrigem.quantidade = 0;
    } else {
        if (itemDestino) {
            itemDestino.quantidade += quantidade;
        } else {
            estoque[destino].push({ tipo, quantidade });
        }
        itemOrigem.quantidade -= quantidade;
    }
}

function dePessoaParaPomar(origem, tipo, quantidade) {
    const itemEncontrado = estoque[origem].find(item => item.tipo === tipo);

    if (itemEncontrado && itemEncontrado.quantidade >= quantidade) {
        itemEncontrado.quantidade -= quantidade;
    } else if (itemEncontrado) {
        itemEncontrado.quantidade = 0;
    } else {
        return;
    }
}

function dePomarParaPessoa(destino, tipo, quantidade) {
    const itemEncontrado = estoque[destino].find(item => item.tipo === tipo);

    if (itemEncontrado) {
        itemEncontrado.quantidade += quantidade;
    } else {
        estoque[destino].push({ tipo, quantidade });
    }
}

function limpaEstoque() {
    estoque = {};
}

export { getEstoque, transacaoNoEstoque, limpaEstoque };
