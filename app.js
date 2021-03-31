const gameContainer = document.querySelector(".game-container");
const bird = document.querySelector(".bird");
const ground = document.querySelector(".ground");

let birdLeft = 110;
let birdBottom = 165;
let gravity = 1.5;
let isGameOver = false;
let gap = 330;

gameContainer.addEventListener("click", () => {
  flyUp();
  //   console.log(birdBottom);
});

const startGame = () => {
  birdBottom -= gravity;
  bird.style.left = birdLeft + "px";
  bird.style.bottom = birdBottom + "px";
};
let startTimerId = setInterval(startGame, 20);

const flyUp = () => {
  if (birdBottom < 350) birdBottom += 30;
  bird.style.bottom = birdBottom + "px";
};

const generateObstacle = () => {
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
        (birdBottom < obstacleBottom + 81 ||
          birdBottom > obstacleBottom + gap - 120)) ||
      birdBottom <= 0
    ) {
      gameOver();
      clearInterval(obstacleTimerId);
    }
    // console.log(obstacleLeft);
  };
  let obstacleTimerId = setInterval(moveObstacle, 20);
  // setTimeout executes a function once the time given expires:
  if (!isGameOver) setTimeout(generateObstacle, 1200);
};
generateObstacle();

const gameOver = () => {
  clearInterval(startTimerId);
  console.log("gameOver");
  isGameOver = true;
};
