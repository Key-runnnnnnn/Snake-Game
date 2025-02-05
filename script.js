console.log("Script is Working");

document.addEventListener("DOMContentLoaded", () => {
  const gameArena = document.getElementById("game-arena");

  const arenaSize = 450;
  const cellSize = 20;
  let score = 0;
  let gameStarted = false;
  let food = { x: 300, y: 200 };
  let snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }, { x: 100, y: 200 }];
  let dx = cellSize;  // displacement in x direction
  let dy = 0;         // displacement in y direction
  let gameSpeed = 200;  // game speed in milliseconds

  function drawScoreBoard() {
    const scoreBoard = document.getElementById("score-board");
    scoreBoard.textContent = `Score: ${score}`;
  }

  function drawDiv(x, y, className) {
    const div = document.createElement("div");
    div.className = className;
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    return div;
  }

  function drawFoodAndSnake() {
    gameArena.innerHTML = "";  // clear the game arena

    snake.forEach((snakeCell) => {
      const snakeElement = drawDiv(snakeCell.x, snakeCell.y, "snake");
      gameArena.appendChild(snakeElement);
    });

    const foodElement = drawDiv(food.x, food.y, "food");
    gameArena.appendChild(foodElement);
  }

  function moveFood() {
    let newX;
    let newY;
    do {
      newX = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize)) * cellSize;
      newY = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize)) * cellSize;
    } while (snake.some((cell) => cell.x === newX && cell.y === newY));
    food = { x: newX, y: newY };
  }

  function updateSnake() {
    // Calculate new coordinates the snake head will go to
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead);  // Add the new head to the snake
    if (newHead.x === food.x && newHead.y === food.y) {
      // Collision with food
      score += 10;
      if(gameSpeed > 50) {
        gameSpeed -= 10;
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, gameSpeed);
      }
      moveFood();  // Move the food to a new location
    } else {
      snake.pop();  // Remove the last element of the snake
    }
  }

  function isGameOver() {
    // Check snake body collision
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
      }
    }
    // Check wall collision
    const isHittingLeftWall = snake[0].x < 0;
    const isHittingRightWall = snake[0].x >= arenaSize;
    const isHittingTopWall = snake[0].y < 0;
    const isHittingBottomWall = snake[0].y >= arenaSize;
    return isHittingLeftWall || isHittingRightWall || isHittingTopWall || isHittingBottomWall;
  }

  function gameLoop() {
    if (!gameStarted) {
      return;
    }
    // Check if the snake has collided with the wall
    if (isGameOver()) {
      gameStarted = false;
      clearInterval(gameInterval);  // Clear the interval to stop the game loop
      alert(`Game Over! Your Score is ${score}`);
      window.location.reload();
      return;
    }

    updateSnake();
    drawScoreBoard();
    drawFoodAndSnake();
  }

  function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;

    const isGoingUp = dy === -cellSize;
    const isGoingDown = dy === cellSize;
    const isGoingRight = dx === cellSize;
    const isGoingLeft = dx === -cellSize;

    if (keyPressed === LEFT_KEY && !isGoingRight) {
      dx = -cellSize;
      dy = 0;
    }

    if (keyPressed === RIGHT_KEY && !isGoingLeft) {
      dx = cellSize;
      dy = 0;
    }

    if (keyPressed === UP_KEY && !isGoingDown) {
      dx = 0;
      dy = -cellSize;
    }

    if (keyPressed === DOWN_KEY && !isGoingUp) {
      dx = 0;
      dy = cellSize;
    }
  }

  function runGame() {
    gameStarted = true;
    gameInterval = setInterval(gameLoop, 500);
    document.addEventListener("keydown", changeDirection);
  }

  function initiateGame() {
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "score-board";
    document.body.insertBefore(scoreBoard, gameArena);

    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.classList.add("start-button");
    document.body.appendChild(startButton);

    startButton.addEventListener("click", () => {
      gameStarted = true;
      startButton.style.display = "none";
      runGame();
    });
  }

  initiateGame();  // First function to be executed to prepare the UI for the game
});