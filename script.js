const gameBoard = document.getElementById('gameBoard');
const tentativasElemento = document.getElementById('tentativasRestantes');
const recordeElemento = document.getElementById('recorde');
const temaSelect = document.getElementById('tema');
let tentativas = 6;
let recorde = 0;
let paresEncontrados = 0;
let primeiraCarta = null;
let segundaCarta = null;

// Arrays de emojis para frutas e animais
const frutas = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍋", "🍓", "🍍"];
const animais = ["🐶", "🐱", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁"];
let cartas = [];  // Array que será configurado conforme o tema escolhido

// Função para embaralhar as cartas
function embaralharCartas() {
    cartas.sort(() => Math.random() - 0.5);
}

// Função para definir o tema (frutas ou animais) com base na seleção do usuário
function definirTema() {
    const temaSelecionado = temaSelect.value;
    if (temaSelecionado === 'frutas') {
        cartas = [...frutas, ...frutas];  // Duplicar as frutas para pares
    } else {
        cartas = [...animais, ...animais];  // Duplicar os animais para pares
    }
    embaralharCartas();
}

// Função para criar o tabuleiro do jogo
function criarTabuleiro() {
    gameBoard.innerHTML = '';
    definirTema();  // Chama a função para configurar as cartas com o tema selecionado
    cartas.forEach((item, index) => {
        const carta = document.createElement('div');
        carta.classList.add('card', 'hidden');
        carta.dataset.index = index;
        carta.dataset.item = item;
        carta.addEventListener('click', revelarCarta);
        gameBoard.appendChild(carta);
    });
}

// Função para revelar a carta
function revelarCarta(event) {
    const carta = event.currentTarget;
    if (carta.classList.contains('hidden') && (!primeiraCarta || !segundaCarta)) {
        carta.textContent = carta.dataset.item;
        carta.classList.remove('hidden');
        if (!primeiraCarta) {
            primeiraCarta = carta;
        } else {
            segundaCarta = carta;
            verificarPar();
        }
    }
}

// Função para verificar se as cartas formam um par
function verificarPar() {
    if (primeiraCarta.dataset.item === segundaCarta.dataset.item) {
        paresEncontrados++;
        primeiraCarta = null;
        segundaCarta = null;
        if (paresEncontrados >= 3) {
            alert('Parabéns! Você venceu o jogo!');
            recorde++;
            recordeElemento.textContent = recorde;
            resetGame();
        }
    } else {
        setTimeout(() => {
            primeiraCarta.classList.add('hidden');
            primeiraCarta.textContent = '';
            segundaCarta.classList.add('hidden');
            segundaCarta.textContent = '';
            primeiraCarta = null;
            segundaCarta = null;
            decrementarTentativas();
        }, 1000);
    }
}

// Função para reduzir tentativas
function decrementarTentativas() {
    tentativas--;
    tentativasElemento.textContent = tentativas;
    if (tentativas <= 0) {
        alert('Suas tentativas acabaram! Reinicie o jogo para tentar novamente.');
        resetGame();
    }
}

// Função para resetar o jogo
function resetGame() {
    tentativas = 6;
    paresEncontrados = 0;
    tentativasElemento.textContent = tentativas;
    criarTabuleiro();
}

// Função para iniciar o jogo
document.getElementById('startButton').addEventListener('click', () => {
    resetGame();
});
