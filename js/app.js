'use strict'

let Dice = Math.random();
console.log(Dice);

function Character(Character_Name, Weapon) {
    this.Character_Name = Character_Name,
    this.Weapon = Weapon
}

let Game_Image_Array = ['img/images/admir.jpg', 'img/images/bkg-1,jpg', 'img/images/bkg-2.jpg', 'img/images/bkg-3.jpg', 'img/images/bkg-4.jpg', 'img/images/hajduk.jpg', 'img/images/mamluk.jpg', 'img/images/sulta.jpg', 'img/images/tabib.png']; //Array for the image files
let Weapons_Array = ['staff', 'sword', 'hammer', 'dagger'] // Array for the weapons

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

function Render_Stats(){
    let Stats_Field = document.getElementById('character-stats');
    let Stats = document.createElement('p');
    Stats.textContent = 'THESE ARE STATS';
    Stats_Field.appendChild(Stats);
}

function Encounter(){
    Render_Image(Game_Image_Array[0]);
    Render_Buttons();
    Render_Stats();
    Render_Game_Text("Hello world!");
}

Encounter();