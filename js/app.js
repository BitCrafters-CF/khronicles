'use strict';

function dice(min, max) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
}

class Character {
  constructor(name, healthPoints, gold, xp, level) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.gold = gold;
    this.xp = xp;
    this.level = level;
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

let playerCharacter = new Character('Bob', 10, 10, 0, 1);
let currentMonster = new Monster('Giant', 15, 20, 5);
let gameState = 'attack';

function renderImage(image) {
  const imageContainer = document.getElementById('dynamic-image');
  imageContainer.innerHTML = '';
  const img = document.createElement('img');
  img.src = image;
  img.alt = 'Dynamic Scene';
  imageContainer.appendChild(img);
}

function renderButtons() {
  const buttonField = document.getElementById('game-buttons');
  buttonField.innerHTML = '';

  if (gameState === 'attack') {
    const buttonFunctions = ['Attack', 'Dodge', 'Run'];
    buttonFunctions.forEach(action => {
      const button = document.createElement('button');
      button.textContent = action;
      button.onclick = () => {
        if (action === 'Attack') {
          attack();
        }
        // Future implementation for Dodge and Run
      };
      buttonField.appendChild(button);
    });
  }
}

function renderGameText(text) {
  const gameTextField = document.getElementById('game-text');
  gameTextField.innerHTML = '';
  const gameText = document.createElement('p');
  gameText.textContent = text;
  gameTextField.appendChild(gameText);
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

function gameOver(isVictory) {
  document.getElementById('game-buttons').innerHTML = '';
  document.getElementById('character-stats').innerHTML = '';
  
  renderGameText(isVictory ? 'Congratulations! You won!' : 'Game Over. You were defeated.');

  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again';
  playAgainButton.onclick = resetGame;
  document.getElementById('game-buttons').appendChild(playAgainButton);
}

function resetGame() {
  playerCharacter = new Character('Bob', 10, 10, 0, 1);
  currentMonster = new Monster('Giant', 15, 20, 5); // Adjust monster as needed
  gameState = 'attack';

  encounter(); // Reinitialize game setup
}

// Player's attack function
function attack() {
    const diceRoll = dice(1, 6);
    const accuracyThreshold = 10 + playerCharacter.level;
    const defense = currentMonster.level;
  
    if (diceRoll + accuracyThreshold > defense) {
      const damage = dice(1, 4) + playerCharacter.level;
      currentMonster.healthPoints -= damage;
      renderGameText(`You've attacked the ${currentMonster.name} for ${damage} damage!`);
    } else {
      renderGameText(`You missed the ${currentMonster.name}!`);
    }
    renderNextButton('Monster Turn', monsterAttack); // Renders a button to proceed to monster's turn
  }
  
  // Monster's attack function, modified to be triggered by "Monster Turn" button
  function monsterAttack() {
    renderGameText(''); // Clear previous game text or append monster attack text
    const damage = dice(1, 4); // Simplified damage calculation for the monster
    // Assuming monster always hits for simplification, add hit/miss logic as needed
    playerCharacter.healthPoints -= damage;
    renderGameText(`The ${currentMonster.name} attacks you for ${damage} damage!`);
    
    renderNextButton('End Turn', renderButtons); // Renders "End Turn" button to reset for player's next turn
  }
  
  // Utility function to render a next step button with customizable label and action
  function renderNextButton(label, action) {
    const buttonField = document.getElementById('game-buttons');
    buttonField.innerHTML = ''; // Clear existing buttons
  
    const nextButton = document.createElement('button');
    nextButton.textContent = label;
    nextButton.addEventListener('click', action);
    buttonField.appendChild(nextButton);
  }
  
  // Modification to the reset or continuation logic may be required to fit this flow
  
function encounter() {
  renderImage('img/images/Monster3.jpg');
  renderGameText('A monster is attacking the town! What will you do?');
  renderButtons();
  renderStats();
}

// Start the encounter
encounter();
