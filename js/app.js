'use strict'

let Weapon_List = ['staff', 'sword', 'hammer', 'dagger']

function Character(Character_Name, Weapon) {
    this.Character_Name = Character_Name,
    this.Weapon = Weapon;
}

const Hajduk = Character('Hajduk', Weapon_List[0]);
const Kahuna = Character('Kahuna', Weapon_List[1]);
const Mamluk = Character('Mamluk', Weapon_List[2]);
const Admir = Character('Admir', Weapon_List[3]);
console.log(Hajduk, Kahuna, Mamluk, Admir);