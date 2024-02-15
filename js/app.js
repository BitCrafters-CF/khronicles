'use strict';

class Character {
  constructor(name, healthPoints, gold, xp, level, image) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.gold = gold;
    this.xp = xp;
    this.level = level;
    this.image = image;
  }
}

class Monster {
  constructor(name, healthPoints, gold, level) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.gold = gold;
    this.level = level;
  }
}

function dice(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const gameElements = {
  gameWindow: document.getElementById('game-window'),
  imageContainer: document.getElementById('dynamic-image'),
  gameTextField: document.getElementById('game-text'),
  buttonField: document.getElementById('game-buttons'),
  statsField: document.getElementById('character-stats'),
};

let playerCharacter;
let currentMonster;
let gameState = 'start';

function initializeGame() {
  renderCharacterSelection();
}

function renderCharacterSelection() {
  gameState = 'start';
  gameElements.gameWindow.innerHTML = '<h2>Select Your Character</h2>';
  // Assuming characterImages is an array of image paths as provided in your initial code snippet
  const characterImages = [
    'img/character1.jpg',
    'img/character2.jpg',
    'img/character3.jpg',
    'img/character4.jpg',
  ];
  const form = document.createElement('form');
  
  characterImages.forEach((image, index) => {
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="radio" name="character" value="${image}" id="character-${index}">
      <img src="${image}" alt="Character ${index}" class="character-image">
    `;
    form.appendChild(label);
  });

  const nameInput = document.createElement('input');
  nameInput.placeholder = 'Enter your name';
  form.appendChild(nameInput);

  const startGameButton = document.createElement('button');
  startGameButton.textContent = 'Start Game';
  startGameButton.addEventListener('click', () => startGame(nameInput, form));
  form.appendChild(startGameButton);

  gameElements.gameWindow.appendChild(form);
}

function startGame(nameInput, form) {
  const playerName = nameInput.value.trim();
  const selectedCharacterImage = form.querySelector('input[name="character"]:checked')?.value;
  if (!playerName || !selectedCharacterImage) {
    alert('Please enter your name and select a character.');
    return;
  }

  playerCharacter = new Character(playerName, 20, 0, 0, 1, selectedCharacterImage);
  gameState = 'attack';
  beginEncounter();
}

function beginEncounter() {
  currentMonster = new Monster('Goblin', 10, 5, 1);
  updateUIForEncounter();
}

function updateUIForEncounter() {
  renderImage(currentMonster.name === 'Goblin' ? 'img/monster.jpg' : 'img/default-monster.jpg');
  renderGameText(`A wild ${currentMonster.name} appears!`);
  renderButtons();
  renderStats();
}

function renderImage(imagePath) {
  gameElements.imageContainer.innerHTML = `<img src="${imagePath}" alt="Scene Image">`;
}

function renderGameText(text) {
  gameElements.gameTextField.innerHTML = `<p>${text}</p>`;
}

function renderButtons() {
  gameElements.buttonField.innerHTML = '';
  if (gameState === 'attack') {
    const attackButton = document.createElement('button');
    attackButton.textContent = 'Attack';
    attackButton.onclick = playerAttack;
    gameElements.buttonField.appendChild(attackButton);

    const runButton = document.createElement('button');
    runButton.textContent = 'Run';
    runButton.onclick = playerRun;
    gameElements.buttonField.appendChild(runButton);
  }
}

function renderStats() {
  const statsField = document.getElementById('character-stats');
  statsField.innerHTML = '';
  
  const playerStats = document.createElement('p');
  playerStats.textContent = `Player - Name: ${playerCharacter.name}, Level: ${playerCharacter.level}, XP: ${playerCharacter.xp}, HP: ${playerCharacter.healthPoints}`;
  statsField.appendChild(playerStats);
  
  if (currentMonster) {
    const monsterStats = document.createElement('p');
    monsterStats.textContent = `Monster - Name: ${currentMonster.name}, Level: ${currentMonster.level}, HP: ${currentMonster.healthPoints}, Gold: ${currentMonster.gold}`;
    statsField.appendChild(monsterStats);
  }
}

function playerRun() {
  if (dice(1, 6) > 3) { // Assuming a simple 50% chance to escape
    renderGameText("You successfully escaped!");
    setTimeout(initializeGame, 2000); // Reinitialize the game after a short delay
  } else {
    renderImage('img/images/MonsterDefeated.jpg'); 
    renderGameText('Game Over. You were defeated.');
  }

  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again';
  playAgainButton.onclick = resetGame;
  document.getElementById('game-buttons').appendChild(playAgainButton);
} 

function resetGame() {
  playerCharacter = new Character('Bob', 10, 10, 0, 1);
  currentMonster = new Monster('Giant', 15, 20, 5);
  gameState = 'attack';

  encounter();
}

function run() {
  const diceRoll = dice(1, 6);
  if (diceRoll >= 4) {
    renderGameText("You have successfully run away!");
    renderImage('img/images/RunningFromMonsterHajduk.jpg');
    renderNewGameButton();
  } else {
    renderButtons(); // Give player the option to attack again or run
  }
}

function gameOver(isVictory) {
  gameState = 'end';
  renderImage(isVictory ? 'img/victory.jpg' : 'img/defeat.jpg');
  renderGameText(isVictory ? 'You have defeated the monster!' : 'You were defeated!');
  gameElements.buttonField.innerHTML = '';

  const restartButton = document.createElement('button');
  restartButton.textContent = 'Restart Game';
  restartButton.addEventListener('click', initializeGame);
  gameElements.buttonField.appendChild(restartButton);
}

window.onload = initializeGame;

