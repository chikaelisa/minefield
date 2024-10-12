function goBack() {
    window.location.href = 'index.html';
}
function startGame() {
    window.location.href = 'partida.html';
}
function myData(){
    window.location.href = 'meusdados.html';
}

const userMock = [
    {
        name: "Pietra",
    }
];

function displayUsername() {
    const user = userMock[0];
    const usernameDisplay = document.querySelector('.perfil_texto');

    if (user && usernameDisplay) {
        usernameDisplay.textContent = `Olá, ${user.name}`;
    }
}

function handleGameModeClick(event) {
    const buttons = document.querySelectorAll('.game-mode');
    buttons.forEach(button => {
        button.classList.remove('active'); 
    });
    event.currentTarget.classList.add('active');
}

const gameModeButtons = document.querySelectorAll('.game-mode');
gameModeButtons.forEach(button => {
    button.addEventListener('click', handleGameModeClick);
});

window.onload = displayUsername;


function updateBombs() {
    const dimensaoInput = document.getElementById('dimensao');
    const dimensaoValue = document.getElementById('dimensaoValue');
    dimensaoValue.innerText = dimensaoInput.value;

    const areaTotal = dimensaoInput.value * dimensaoInput.value;
    const maxBombas = Math.floor(areaTotal / 2);
    const bombasInput = document.getElementById('bombas');
    bombasInput.max = maxBombas;

    if (bombasInput.value > maxBombas) {
        bombasInput.value = maxBombas;
    }

    updateBombasValue(); 
}

function updateBombasValue() {
    const bombasInput = document.getElementById('bombas');
    const bombasValue = document.getElementById('bombasValue');
    bombasValue.innerText = bombasInput.value;
}