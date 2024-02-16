
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
        const buttonFunctions = ['Attack', 'Run'];
        buttonFunctions.forEach(action => {
            const button = document.createElement('button');
            button.textContent = action;
            button.onclick = () => {
                if (action === 'Attack') {
                    attack();
                } else if (action === 'Run') {
                    run();
                }
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
  // Display relevant image
  if (isVictory) {
    renderImage('img/images/VictoryScroll.jpg');
    renderGameText('Congratulations! You won!'); 
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
    renderGameText("You failed to run away. Monster's turn!");
    renderNextButton('Monster Turn', monsterAttack);
  }
}
function renderNewGameButton() {
  const buttonField = document.getElementById('game-buttons');
  buttonField.innerHTML = '';
  const newGameButton = document.createElement('button');
  newGameButton.textContent = 'New Game';
  newGameButton.onclick = resetGame;
  buttonField.appendChild(newGameButton);
}
function attack() {
    const diceRoll = dice(1, 6);
    const accuracyThreshold = 10 + playerCharacter.level;
    const defense = currentMonster.level;
  
    if (diceRoll + accuracyThreshold > defense) {
        const damage = dice(1, 4) + playerCharacter.level;
        currentMonster.healthPoints = Math.max(0, currentMonster.healthPoints - damage); // Prevent monster health from going below 0
        renderGameText(`You've attacked the ${currentMonster.name} for ${damage} damage!`);
        renderImage('img/images/FightingMonsterHajduk.jpg');
    
        if (currentMonster.healthPoints <= 0) {
          renderGameText('You have defeated the monster!'); 
          gameOver(true);  // Call gameOver with 'true' for victory
          return;
        }
    } else {
      renderGameText(`You missed the ${currentMonster.name}!`);
    }
  
    // Remove previous action buttons
    document.getElementById('game-buttons').innerHTML = ''; 
  
    // Initiate the monster's turn with a 'Next' button
    renderNextButton('Next', monsterPhase); 
  }
  
  function monsterPhase() {
    // Remove the 'Next' button
    document.getElementById('game-buttons').innerHTML = ''; 
  
    const damage = dice(1, 4);
    playerCharacter.healthPoints = Math.max(0, playerCharacter.healthPoints - damage); // Prevent player health from going below 0
    renderGameText(`The ${currentMonster.name} attacks you for ${damage} damage!`);
    if (playerCharacter.healthPoints <= 0) {
      renderGameText('You have been defeated!'); 
      gameOver(false); // Call gameOver with 'false' for defeat
      return; 
    }
    // Update the stats before returning the player to actions
    renderStats();  
    renderNextButton('Next', renderButtons); 
  }
function renderNextButton(label, action) {
  const buttonField = document.getElementById('game-buttons');
  buttonField.innerHTML = '';
  const nextButton = document.createElement('button');
  nextButton.textContent = label;
  nextButton.addEventListener('click', action);
  buttonField.appendChild(nextButton);
}
function encounter() {
  renderImage('img/images/Monster3.jpg');
  renderGameText('A monster is attacking the town! What will you do?');
  renderButtons();
  renderStats();
}

encounter();