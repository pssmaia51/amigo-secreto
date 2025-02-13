const MAX_PARTICIPANTES = 10;
let listaAmigos = [];

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('amigo');

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            adicionarAmigo();
        }
    });

    input.focus();
});

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nomeAmigo = input.value.trim();

    if (nomeAmigo === '') {
        responsiveVoice.speak('Por favor, insira um nome.', 'Brazilian Portuguese Female', { rate: 1.2 });
        return;
    }

    if (listaAmigos.length >= MAX_PARTICIPANTES) {
        responsiveVoice.speak('Limite de participantes atingido. Não é possível adicionar mais amigos.', 'Brazilian Portuguese Female', { rate: 1.2 });
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
        responsiveVoice.speak('É necessário pelo menos 2 participantes para realizar o sorteio.', 'Brazilian Portuguese Female', { rate: 1.2 });
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

    responsiveVoice.speak('O sorteio foi realizado com sucesso.', 'Brazilian Portuguese Female', { rate: 1.2 });
}

function limparLista() {
    listaAmigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    responsiveVoice.speak('A lista de amigos foi limpa.', 'Brazilian Portuguese Female', { rate: 1.2 });
    document.getElementById('amigo').focus();

    //Projeto Final 
}
