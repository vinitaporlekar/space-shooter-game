const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
let gameActive = true;
let lives = 3;
let score = 0;

// Player object
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 80,
    width: 50,
    height: 40,
    speed: 6,
    color: '#00ff00'
};

// Arrays for bullets and enemies
let bullets = [];
let enemies = [];

// Keyboard input
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

// Draw player spaceship
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x, player.y + player.height);
    ctx.lineTo(player.x + player.width, player.y + player.height);
    ctx.closePath();
    ctx.fill();
    
    // Engine glow
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(player.x + 10, player.y + player.height, 10, 5);
    ctx.fillRect(player.x + 30, player.y + player.height, 10, 5);
}

// Shoot bullet
function shootBullet() {
    bullets.push({
        x: player.x + player.width / 2 - 2,
        y: player.y,
        width: 4,
        height: 15,
        speed: 8,
        color: '#ffff00'
    });
    console.log("Bullet fired!");
}

// Create enemy
function createEnemy() {
    enemies.push({
        x: Math.random() * (canvas.width - 40),
        y: -40,
        width: 40,
        height: 30,
        speed: Math.random() * 2 + 2,
        color: '#ff0000'
    });
}

// Check collision between two rectangles
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Update game state
function update() {
    if (!gameActive) return;

    // Move player left
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    
    // Move player right
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }

    // Update bullets
    bullets = bullets.filter(bullet => {
        bullet.y -= bullet.speed;
        return bullet.y > -bullet.height;
    });

    // Update enemies
    enemies = enemies.filter(enemy => {
        enemy.y += enemy.speed;
        
        // Check collision with player
        if (checkCollision(player, enemy)) {
            lives--;
            document.getElementById('lives').textContent = lives;
            if (lives <= 0) {
                endGame();
            }
            return false;
        }
        
        return enemy.y < canvas.height + enemy.height;
    });

    // Check bullet-enemy collisions
    bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (checkCollision(bullet, enemy)) {
                bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);
                score += 10;
                document.getElementById('score').textContent = score;
            }
        });
    });

    // Spawn enemies randomly
    if (Math.random() < 0.02) {
        createEnemy();
    }
}

// Draw everything
function draw() {
    // Clear canvas with solid black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw player
    drawPlayer();

    // Draw bullets
    bullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        
        // Bullet glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        ctx.shadowBlur = 0;
    });

    // Draw enemies
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        
        // Draw enemy eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(enemy.x + 10, enemy.y + 10, 5, 5);
        ctx.fillRect(enemy.x + 25, enemy.y + 10, 5, 5);
    });
}

// End game
function endGame() {
    gameActive = false;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').style.display = 'block';
}

// Restart game
function restartGame() {
    gameActive = true;
    score = 0;
    lives = 3;
    bullets = [];
    enemies = [];
    player.x = canvas.width / 2 - 25;
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('gameOver').style.display = 'none';
}

// Game loop - runs 60 times per second
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game!
console.log("Game starting...");
console.log("Canvas size:", canvas.width, "x", canvas.height);
console.log("Player position:", player.x, player.y);
gameLoop();