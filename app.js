const MAX_PARTICIPANTES = 10;
let listaAmigos = [];

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('amigo');

    input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            adicionarAmigo();
        }
    });

    input.focus();
});

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nomeAmigo = input.value.trim();

    if (nomeAmigo === '') {
        alert('Por favor, insira um nome.');
        return;
    }

    if (listaAmigos.length >= MAX_PARTICIPANTES) {
        alert('Limite de participantes atingido. Não é possível adicionar mais amigos.');
        return;
    }

    listaAmigos.push(nomeAmigo);
    atualizarListaAmigos();
    input.value = '';
    input.focus();
}

function atualizarListaAmigos() {
    const ul = document.getElementById('listaAmigos');
    ul.innerHTML = '';
    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${amigo}`;
        ul.appendChild(li);
    });
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert('É necessário pelo menos 2 participantes para realizar o sorteio.');
        return;
    }

    const sorteio = [...listaAmigos];
    sorteio.sort(() => Math.random() - 0.5);

    const resultado = sorteio.map((amigo, index) => {
        const proximoIndex = (index + 1) % sorteio.length;
        return `${amigo} tirou ${sorteio[proximoIndex]}`;
    });

    const ulResultado = document.getElementById('resultado');
    ulResultado.innerHTML = '';
    resultado.forEach((res) => {
        const li = document.createElement('li');
        li.textContent = res;
        ulResultado.appendChild(li);
    });
}

function limparLista() {
    listaAmigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').focus();
}

