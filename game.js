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
ctx.fillStyle = bullet.color;
ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
function gameLoop() {
    update();  // Move everything
    draw();    // Draw everything
    requestAnimationFrame(gameLoop);  // Run again!
}
function update() {
    // Move player left
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    
    // Move player right
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}
bullets = bullets.filter(bullet => {
    bullet.y -= bullet.speed;  // Move up
    return bullet.y > -bullet.height;  // Keep if still on screen
});
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}