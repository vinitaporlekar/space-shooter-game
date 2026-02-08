const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');  // ← Fixed: added 'canvas.'

let gameActive = true;
let lives = 3;
let score = 0;

const player = {  // ← Fixed: added '=' and use ':' inside
    x: canvas.width / 2 - 25,
    y: canvas.height - 80,
    width: 50,
    height: 40,
    speed: 6,
    color: '#00ff00'
};  // ← Fixed: added semicolon

const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === ' ' && gameActive) {
        e.preventDefault();
        shootBullet();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x, player.y + player.height);
    ctx.lineTo(player.x + player.width, player.y + player.height);
    ctx.closePath();
    ctx.fill();
}