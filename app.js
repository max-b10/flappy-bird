const gameContainer = document.querySelector(".game-container");
const bird = document.querySelector(".bird");
const ground = document.querySelector(".ground");
const topBorder = document.querySelector(".border-top");
const startButton = document.querySelector(".start-button");
const playerScore = document.createElement("div");
playerScore.classList.add("player-score");

// Hide restart button until game over:
const restartButton = document.querySelector(".restart-button");
restartButton.style.display = "none";
restartButton.addEventListener("click", () => {
  window.location.reload(true);
});
// bird starting position and a gap between obstacles
let birdLeft = 110;
let birdBottom = 165;
let gap = 330;
let gravity = 1.5;

let isGameOver = false;
let gameStarted = false;
let score = 0;
playerScore.innerHTML = `Score : ${score}`;

startButton.addEventListener("click", () => {
  gameStarted = true;
  startGame();
  generateObstacle();
  startButton.style.display = "none";
  topBorder.appendChild(playerScore);
});

const startGame = () => {
  if (gameStarted) {
    birdBottom -= gravity;
    bird.style.left = birdLeft + "px";
    bird.style.bottom = birdBottom + "px";
  }
};
let startTimerId = setInterval(startGame, 20);

const flyUp = () => {
  if (birdBottom < 350 && !isGameOver) birdBottom += 30;
  bird.style.bottom = birdBottom + "px";
};

const generateObstacle = () => {
  if (gameStarted) {
    // Create random heights for each obstacle:
    let obstacleLeft = 350;
    let randomHeight = Math.random() * 90;
    let obstacleBottom = randomHeight;

    // Create and append each obstacle (if game isn't over):
    const bottomObstacle = document.createElement("div");
    const topObstacle = document.createElement("div");

    if (!isGameOver) {
      bottomObstacle.classList.add("bottom-obstacle");
      topObstacle.classList.add("top-obstacle");
    }

    gameContainer.appendChild(bottomObstacle);
    gameContainer.appendChild(topObstacle);

    // Where each obstacle starts:
    bottomObstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";
    bottomObstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    const moveObstacle = () => {
      //   move the obstacle left 2px (every 20ms using setInterval).
      obstacleLeft -= 4;
      bottomObstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft === -50) {
        // stop the interval from executing:
        clearInterval(obstacleTimerId);
        //   and remove each obstacle:
        gameContainer.removeChild(bottomObstacle);
        gameContainer.removeChild(topObstacle);
      }

      //   logic determining if the bird and either obstacle are in the same vertical alignment.
      if (
        (obstacleLeft > 100 &&
          obstacleLeft < 160 &&
          birdLeft === 110 &&
          (birdBottom < obstacleBottom + 78 ||
            birdBottom > obstacleBottom + gap - 145)) ||
        birdBottom === 0
      ) {
        gameOver();
        clearInterval(obstacleTimerId);
      }
      // Increment score:
      if (obstacleLeft === 10) {
        score++;
        playerScore.innerHTML = `Score : ${score}`;

        console.log(score);
      }
    };
    let obstacleTimerId = setInterval(moveObstacle, 20);
    // setTimeout executes a function once the time given expires:
    if (!isGameOver) setTimeout(generateObstacle, 1300);
  }
};
generateObstacle();
const gameOver = () => {
  clearInterval(startTimerId);
  console.log("gameOver");
  isGameOver = true;
  restartButton.style.display = "block";
};
gameContainer.addEventListener("click", () => {
  if (gameStarted) flyUp();
});
