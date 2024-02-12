'use strict'

let Dice = Math.random();
console.log(Dice);

function Character(Character_Name, Weapon) {
    this.Character_Name = Character_Name,
    this.Weapon = Weapon
}

let Game_Image_Array = ['img/images/admir.jpg', 'img/images/bkg-1,jpg', 'img/images/bkg-2.jpg', 'img/images/bkg-3.jpg', 'img/images/bkg-4.jpg', 'img/images/hajduk.jpg', 'img/images/mamluk.jpg', 'img/images/sulta.jpg', 'img/images/tabib.png']; //Array for the image files
let Weapons_Array = ['staff', 'sword', 'hammer', 'dagger'] // Array for the weapons

function Render_Image() {
    let Image_Container = document.getElementById('dynamic-image');
    let Image = document.createElement('img');
    Image.src = Game_Image_Array[3];
    Image.alt = 'Test';

    Image_Container.appendChild(Image);

}

const Hajduk = new Character('Hajduk', Weapons_Array[0]);
const Kahuna = new Character('Kahuna', Weapons_Array[1]);
const Mamluk = new Character('Mamluk', Weapons_Array[2]);
const Admir = new Character('Admir', Weapons_Array[3]);

console.log(Hajduk, Kahuna, Mamluk, Admir);

Render_Image();