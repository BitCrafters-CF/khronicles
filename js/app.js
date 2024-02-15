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
  gameElements.statsField.innerHTML = `
    <p>Player - ${playerCharacter.name}, HP: ${playerCharacter.healthPoints}</p>
    <p>Monster - ${currentMonster.name}, HP: ${currentMonster.healthPoints}</p>
  `;
}

function playerAttack() {
  const hitChance = dice(1, 6) + playerCharacter.level;
  if (hitChance > currentMonster.level) {
    const damage = dice(1, 4) + playerCharacter.level;
    currentMonster.healthPoints -= damage;
    renderGameText(`You hit the ${currentMonster.name} for ${damage} damage.`);
    if (currentMonster.healthPoints <= 0) {
      gameOver(true);
    } else      monsterAttack();
  } else {
    renderGameText("You missed!");
    monsterAttack();
  }
}

function playerRun() {
  if (dice(1, 6) > 3) { // Assuming a simple 50% chance to escape
    renderGameText("You successfully escaped!");
    setTimeout(initializeGame, 2000); // Reinitialize the game after a short delay
  } else {
    renderGameText("You failed to escape and the monster attacks!");
    monsterAttack();
  }
}

function monsterAttack() {
  const damage = dice(1, 4);
  playerCharacter.healthPoints -= damage;
  renderGameText(`The ${currentMonster.name} attacks you for ${damage} damage.`);
  if (playerCharacter.healthPoints <= 0) {
    gameOver(false);
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

