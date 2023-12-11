import { getEstoque, transacaoNoEstoque, limpaEstoque } from "./estoque.js";

const olJoao = document.querySelector("#joao");
const olMaria = document.querySelector("#maria");

document.entrada.addEventListener('submit', leFormulario);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buttonLimparEstoque').addEventListener('click', () => {
        limpaEstoque();
        atualizaTela();
    });
});

atualizaTela();

function leFormulario(event) {
    event.preventDefault();
    const quantidade = document.entrada.quantidade.valueAsNumber;
    const fruta = document.entrada.fruta.value;
    const origem = document.entrada.origem.value;
    const destino = document.entrada.destino.value;

    console.log(`${origem} de ${quantidade} ${fruta} para ${destino}`)

    transacaoNoEstoque(origem, destino, fruta, quantidade);
    atualizaTela();
    //document.entrada.submit();
}

function atualizaTela() {
    const estoque = getEstoque();
    olJoao.innerHTML = "";
    olMaria.innerHTML = "";
    document.entrada.quantidade.value = 1;
    document.entrada.fruta.value = "maca";

    if (estoque.joao && estoque.joao.length > 0) {
        preencheLista(olJoao, estoque.joao);
    }

    if (estoque.maria && estoque.maria.length > 0) {
        preencheLista(olMaria, estoque.maria);
    }
}

function preencheLista(lista, estoqueDaPessoa) {
    lista.textContent = "";
    for (let i = 0; i < estoqueDaPessoa.length; i++) {
        const monte = estoqueDaPessoa[i];
        const li = document.createElement('li');
        li.textContent = `${monte.tipo}: ${monte.quantidade}`;
        lista.append(li);
    }

}