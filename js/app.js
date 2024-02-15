'use strict';

function dice(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
}

class Character {
    constructor(name, healthPoints, gold, xp, level, image) {
        this.name = name;
        this.healthPoints = healthPoints;
        this.gold = gold;
        this.xp = xp;
        this.level = level;
        this.image = image; // Added to hold the character image path
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

let playerCharacter = new Character('Hero', 10, 10, 0, 1, '');
let currentMonster = new Monster('Giant', 15, 20, 5);
let gameState = 'start'; // Initial state is 'start'
let playerName = '';

const characterImages = [
    'img/images/CharacterHajduk.jpg',
    'img/images/CharacterAdmir.jpg',
    'img/images/CharacterKahuna.jpg',
    'img/images/CharacterMamluk.jpg'
];

// DOM element retrieval
const gameWindow = document.getElementById('game-window');
const imageContainer = document.getElementById('dynamic-image');
const gameTextField = document.getElementById('game-text');
const buttonField = document.getElementById('game-buttons');
const statsField = document.getElementById('character-stats');

function renderImage(image) {
    if (imageContainer) {
        imageContainer.innerHTML = '';
        const img = document.createElement('img');
        img.src = image;
        img.alt = 'Dynamic Scene';
        imageContainer.appendChild(img);
    }
}

function renderButtons() {
    if (buttonField) {
        buttonField.innerHTML = '';
        if (gameState === 'attack') {
            ['Attack', 'Run'].forEach(action => {
                const button = document.createElement('button');
                button.textContent = action;
                button.addEventListener('click', action === 'Attack' ? attack : run);
                buttonField.appendChild(button);
            });
        }
    }
}

function renderGameText(text) {
    if (gameTextField) gameTextField.innerHTML = `<p>${text}</p>`;
}

function renderStats() {
    if (statsField) {
        statsField.innerHTML = `
            <p>Player - Name: ${playerCharacter.name}, Level: ${playerCharacter.level}, XP: ${playerCharacter.xp}, HP: ${playerCharacter.healthPoints}</p>
            <p>Monster - Name: ${currentMonster.name}, Level: ${currentMonster.level}, HP: ${currentMonster.healthPoints}, Gold: ${currentMonster.gold}</p>
        `;
    }
}

function gameOver(isVictory) {
    gameState = 'end';
    renderImage(isVictory ? 'img/images/VictoryScroll.jpg' : 'img/images/MonsterDefeated.jpg');
    renderGameText(isVictory ? 'Congratulations! You won!' : 'Game Over. You were defeated.');
    buttonField.innerHTML = ''; // Clear buttons
    // Add a play again button
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.addEventListener('click', resetGame);
    buttonField.appendChild(playAgainButton);
}

function resetGame() {
    playerCharacter = new Character(playerName, 20, 0, 0, 1, selectedCharacter);
    currentMonster = new Monster('Goblin', 10, 5, 2);
    gameState = 'attack';
    encounter();
}

function run() {
    const diceRoll = dice(1, 6);
    if (diceRoll >= 4) {
        renderGameText("You've successfully run away!");
        resetGame(); // Reset or go to a safe state
    } else {
        renderGameText("You failed to run away, the monster attacks!");
        monsterPhase();
    }
}

function attack() {
    const hitChance = dice(1, 6) + playerCharacter.level;
    if (hitChance > currentMonster.level) {
        const damage = dice(1, 4) + playerCharacter.level;
        currentMonster.healthPoints -= damage;
        renderGameText(`You hit the ${currentMonster.name} for ${damage} damage.`);
        if (currentMonster.healthPoints <= 0) {
            playerCharacter.gold += currentMonster.gold;
            playerCharacter.xp += currentMonster.level * 5;
            gameOver(true);
        } else {
            monsterPhase();
        }
    } else {
        renderGameText("You missed!");
        monsterPhase();
    }
}

function monsterPhase() {
    const damage = dice(1, 4);
    playerCharacter.healthPoints -= damage;
    renderGameText(`The ${currentMonster.name} hits you for ${damage} damage.`);
    if (playerCharacter.healthPoints <= 0) {
        gameOver(false);
    } else {
        renderButtons(); // Allow the player to choose their next action
    }
}

function encounter() {
    gameState = 'attack';
    currentMonster = new Monster('Goblin', 10, 5, 2); // Example monster for new encounters
    renderImage('img/images/Monster3.jpg');
    renderGameText('A wild monster appears! What will you do?');
    renderButtons();
    renderStats();
}

function renderCharacterSelection() {
  gameState = 'start';
  gameWindow.innerHTML = '<h2>Select Your Character</h2>';
  const form = document.createElement('form');
  characterImages.forEach((image, index) => {
      const label = document.createElement('label');
      label.className = 'character-option';

      const radioInput = document.createElement('input');
      radioInput.type = 'radio';
      radioInput.name = 'character';
      radioInput.value = image;
      radioInput.id = `character-${index}`;

      const img = document.createElement('img');
      img.src = image;
      img.alt = `Character ${index}`;
      img.className = 'character-image';

      label.appendChild(radioInput);
      label.appendChild(img);
      form.appendChild(label);
  });

  const nameInput = document.createElement('input');
  nameInput.placeholder = 'Enter your name';
  nameInput.id = 'player-name';
  form.appendChild(nameInput);

  const startGameButton = document.createElement('button');
  startGameButton.type = 'button'; // Prevent form submission
  startGameButton.textContent = 'Start Game';
  startGameButton.addEventListener('click', () => {
      playerName = nameInput.value.trim();
      if (!playerName) {
          alert('Please enter your name.');
          return;
      }
      const selected = document.querySelector('input[name="character"]:checked');
      if (!selected) {
          alert('Please select a character.');
          return;
      }
      selectedCharacter = selected.value;
      playerCharacter = new Character(playerName, 20, 0, 0, 1, selectedCharacter);
      gameWindow.innerHTML = '';
      encounter(); // Begin the encounter
  });
  form.appendChild(startGameButton);

  gameWindow.appendChild(form);
}


// Initialize the game
window.onload = renderCharacterSelection;
