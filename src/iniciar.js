const buttons = document.querySelectorAll('.game-mode');

function goBack() {
    window.location.href = 'index.html';
}
function startGame() {

    const selectedButton = document.querySelector('.active');
    const dimensionInput = document.getElementById('dimensao');
    const bombsInput = document.getElementById('bombas');

    if (selectedButton !== null)
    {
        localStorage.setItem("user", userMock[0]);
        localStorage.setItem("mode", selectedButton.textContent);
        localStorage.setItem("numberBombs", bombsInput.value);
        localStorage.setItem("dimension", dimensionInput.value);
        window.location.href = 'partida.html';
    }
    else{
        Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            text: 'Escolha uma modalidade antes de iniciar o jogo.'
        });
    }
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
    buttons.forEach(button => {
        button.classList.remove('active'); 
    });
    event.currentTarget.classList.add('active');
    updateInputs(event.currentTarget.id);
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

function updateInputs(id) {
    const dimensaoInput = document.getElementById("dimensao");
    const bombasInput = document.getElementById('bombas');
    const dimensaoValue = document.getElementById('dimensaoValue');
    const bombasValue = document.getElementById('bombasValue');

    dimensaoInput.disabled = (id === 'rankedButton');
    bombasInput.disabled = (id === 'rankedButton');

    if (id === 'rankedButton')
    {
        dimensaoInput.value = 20;
        bombasInput.value = 100;
        dimensaoValue.innerText = dimensaoInput.value;
        bombasValue.innerText = bombasInput.value;
    }
}

function changeBombasValue(option) {
    const bombasInput = document.getElementById('bombas');
    const bombasValue = document.getElementById('bombasValue');

    if (option === 0 && bombasInput.value > 5)
    {
        bombasInput.value = Number(bombasInput.value) - 1;
        bombasValue.innerText = bombasInput.value;
    }
    else if (option === 1)
    {
        bombasInput.value = Number(bombasInput.value) + 1;
        bombasValue.innerText = bombasInput.value;
    }
    
}

function changeDimensaoValue(option) {
    const dimensaoInput = document.getElementById('dimensao');
    const dimensaoValue = document.getElementById('dimensaoValue');

    if (option === 0 && dimensaoInput.value > 10)
    {
        dimensaoInput.value = Number(dimensaoInput.value) - 1;
        dimensaoValue.innerText = dimensaoInput.value; 
    }
    else if (option === 1)
    {
        dimensaoInput.value = Number(dimensaoInput.value) + 1;
        dimensaoValue.innerText = dimensaoInput.value; 
    }

}

const simboloMenosDimensao = document.getElementById("simboloMenosDimensao");
const simboloMaisDimensao = document.getElementById("simboloMaisDimensao");
simboloMenosDimensao.addEventListener('click', () => { changeDimensaoValue(0); });
simboloMaisDimensao.addEventListener('click', () => { changeDimensaoValue(1); });

const simboloMenosBombas = document.getElementById("simboloMenosBomba");
const simboloMaisBombas = document.getElementById("simboloMaisBomba");
simboloMenosBombas.addEventListener('click', () => { changeBombasValue(0); });
simboloMaisBombas.addEventListener('click', () => { changeBombasValue(1); });