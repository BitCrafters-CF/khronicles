'use strict'

let Dice = Math.random();
console.log(Dice);

function Character(Character_Name, Weapon, HealthPoints, Gold, xp, Player_Level) {
    this.Character_Name = Character_Name,
    this.Weapon = Weapon
    this.HealthPoints = HealthPoints;
    this.Gold = Gold;
    this.xp = xp;
    this.Player_Level = Player_Level;
}

let Weapons_Array = ['staff', 'sword', 'hammer', 'dagger'] // Array for the weapons

const PlayerCharacter = new Character('Bob', Weapons_Array[0], 10, 10, 0, 1);

function Render_Image(image) {
    let Image_Container = document.getElementById('dynamic-image');
    let Image = document.createElement('img');
    Image.src = image;
    Image.alt = 'Test';

    Image_Container.appendChild(Image);

}

function Render_Buttons() {
    let Button_Field = document.getElementById('game-buttons');
    for(let x = 1; x < 4; x++) {
        let Button = document.createElement('button');
        Button.textContent = 'Test: ' + x;
        Button_Field.appendChild(Button);
    }
}

function Render_Game_Text(text){
    let Game_Text_Field = document.getElementById('game-text');
    let Game_Text = document.createElement('p');
    Game_Text.textContent = text;
    Game_Text_Field.appendChild(Game_Text);
}

function Render_Stats(stats){
    let Stats_Field = document.getElementById('character-stats');
    let Stats = document.createElement('p');
    Stats.textContent = `Name: ${PlayerCharacter.Character_Name}, Level: ${PlayerCharacter.Player_Level}, XP: ${PlayerCharacter.xp}`;
    Stats_Field.appendChild(Stats);
}

function Encounter(){
    Render_Image('img/images/Monster3.jpg');
    Render_Game_Text('A monster is attacking the town! What will you do?');
    Render_Buttons();
    Render_Stats('Test Stats');
}

Encounter();

const shakingElement = document.getElementById('game-buttons');

shakingElement.addEventListener('mouseenter', function() {
  this.classList.add('shaking');
});

shakingElement.addEventListener('animationend', function() {
  this.classList.remove('shaking');
});