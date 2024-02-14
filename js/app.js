'use strict'

function Dice(min, max){
    let minCeil = Math.ceil(min);
    let maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
}

console.log(Dice(1, 6));

function Character(Character_Name, Weapon, Health_Points, Gold, xp, Player_Level) {
    this.Character_Name = Character_Name,
    this.Weapon = Weapon
    this.Health_Points = Health_Points;
    this.Gold = Gold;
    this.xp = xp;
    this.Player_Level = Player_Level;
}

function Monster(Monster_Name, Health_Points, Gold, Monster_Level) {
    this.Monster_Name = Monster_Name;
    this.Health_Points = Health_Points;
    this.Gold = Gold;
    this.Monster_Level = Monster_Level;
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
    let Button_Functions = ['Attack', 'Dodge', 'Run'];
    let Button_Field = document.getElementById('game-buttons');
    for(let x = 0; x < Button_Functions.length; x++) {
        let Button = document.createElement('button');
        Button.textContent = Button_Functions[x];
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