const portfolioButton = document.querySelector(".return-button");
const gameContainer = document.querySelector(".game-container");
const bird = document.querySelector(".bird");
const ground = document.querySelector(".ground");
const topBorder = document.querySelector(".border-top");
const startButton = document.querySelector(".start-button");
const playerScore = document.createElement("div");
playerScore.classList.add("player-score");

portfolioButton.addEventListener("click", () => {
  window.location.replace("https://maxbungay.com");
});

// Hide restart button until game over:
const restartButton = document.querySelector(".restart-button");
restartButton.style.display = "none";
restartButton.addEventListener("click", () => {
  window.location.reload(true);
});
// bird starting position and a gap between obstacles
let birdLeft = 110;
let birdBottom = 165;
let desktopGap = 330;
let mobileGap = 220;
let gravity = 1.5;

let isGameOver = false;
let gameStarted = false;
let score = 0;
playerScore.innerHTML = `Score : ${score}`;

let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
// console.log(deviceWidth);

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
  if (deviceWidth > 425) {
    if (birdBottom < 350 && !isGameOver) birdBottom += 30;
    bird.style.bottom = birdBottom + "px";
  } else {
    if (birdBottom < 350 && !isGameOver) birdBottom += 35;
    bird.style.bottom = birdBottom + "px";
  }
};

const generateObstacle = () => {
  if (deviceWidth > 425) {
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
      topObstacle.style.bottom = obstacleBottom + desktopGap + "px";

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
              birdBottom > obstacleBottom + desktopGap - 145)) ||
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
  } else {
    // // Mobile device:
    if (gameStarted) {
      // Create random heights for each obstacle:
      let obstacleLeft = 350;
      let mobileRandomHeight = Math.random() * (120 - 70) + 70;
      let mobileObstacleBottom = mobileRandomHeight;

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
      bottomObstacle.style.bottom = mobileObstacleBottom + "px";
      topObstacle.style.bottom = mobileObstacleBottom + mobileGap + "px";

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
            obstacleLeft < 133 &&
            birdLeft === 110 &&
            (birdBottom < mobileObstacleBottom - 20 ||
              birdBottom > mobileObstacleBottom + mobileGap - 105)) ||
          birdBottom === 0
        ) {
          console.log(mobileObstacleBottom);

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
  }
};
generateObstacle();
const gameOver = () => {
  clearInterval(startTimerId);
  console.log("gameOver");
  isGameOver = true;
  restartButton.style.display = "block";
  // console.log(`mobileObstacleBottom:${mobileObstacleBottom}`);
  console.log(`bird bottom: ${birdBottom}`);
};

gameContainer.addEventListener("click", () => {
  if (gameStarted) flyUp();
});
