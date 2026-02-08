const canvas = document.getElementById("gameCanvas");
const ctx = document.getContext('2d')

let gameActive = true;
let lives =3;
let score =0;

let player {
    x =canvas.width / 2 - 25,
    y = canvas.height -8,
    width = 20,
    height =20,
    speed = 6,
    color = '#00ff00',

}

