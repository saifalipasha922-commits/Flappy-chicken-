const chicken = document.getElementById("chicken");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");
const resetButton = document.getElementById("resetButton");
let winnerName = "Saif Ali";
ctx.fillStyle = "white";
ctx.font = "20px Arial";
ctx.fillText("Winner: " + winnerName, 10, 30);

let score = 0;
let level = 1;
let jumping = false;
let gameOver = false;

// Chicken Jump
function jump() {
    if (jumping || gameOver) return;

    jumping = true;
    chicken.classList.add("jump");

    setTimeout(() => {
        chicken.classList.remove("jump");
        jumping = false;
    }, 2000);
}

// Keyboard Control
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault();
        jump();
    }
});

// Touch Control
game.addEventListener("touchstart", function(event) {
    event.preventDefault();
    jump();
});

// Mouse Control
game.addEventListener("click", function() {
    jump();
});

// Reset Game
resetButton.addEventListener("click", function() {
    location.reload();
});

// Score System
setInterval(function() {
    if (gameOver) return;

    score++;
    scoreText.innerText = "Score: " + score;

    if (score % 10 === 0) {
        level++;
        levelText.innerText = "Level: " + level;
    }
}, 1000);

// Collision Detection
function checkCollision() {
    if (gameOver) return;

    const chickenRect = chicken.getBoundingClientRect();
    const obstacles = document.querySelectorAll(".obstacle");

    obstacles.forEach(function(obstacle) {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            chickenRect.left < obstacleRect.right &&
            chickenRect.right > obstacleRect.left &&
            chickenRect.top < obstacleRect.bottom &&
            chickenRect.bottom > obstacleRect.top
        ) {
            gameOver = true;
            alert("Game Over!");
        }
    });
}

// Game Loop
setInterval(checkCollision, 10);