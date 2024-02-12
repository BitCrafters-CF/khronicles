'use strict'

let Weapon_List = ['staff', 'sword', 'hammer', 'axe']

function Character(Character_Name, Weapon) {
    this.Character_Name = Character_Name,
    this.Weapon = Weapon;
}

const Hajduk = Character('Hajduk', Weapon_List[0]);
console.log(Hajduk);