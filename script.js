console.log("Script is Working");

document.addEventListener("DOMContentLoaded", () => {
  const gameArena = document.getElementById("game-arena");

  const arenaSize = 450
  const cellSize = 20;
  let score = 0;
  let gameStarted = false;
  let food = { x: 300, y: 200 };
  let snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }, { x: 100, y: 200 }];
  let dx = cellSize;// displacement in x direction
  let dy = 0; // displacement in y direction





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
    gameArena.innerHTML = "";//clear the game arena

    snake.forEach((snakeCell) => {
      const snakeElement = drawDiv(snakeCell.x, snakeCell.y, "snake");
      gameArena.appendChild(snakeElement);
    })


    const foodElement = drawDiv(food.x, food.y, "food");
    gameArena.appendChild(foodElement);
  }



  function moveFood() {
    let newX;
    let newY;
    do {
      newX = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize)) * cellSize;

      newY = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize)) * cellSize;

    } while (snake.some((cell) => cell.x === newX && cell.y === newY))

    food = { x: newX, y: newY };
  }



  function updateSnake() {
    // 1. calculate new coordinates the snake head will go to
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead);//add the new head to the snake
    if (newHead.x === food.x && newHead.y === food.y) {
      //collision with food
      score += 10;

      // dont remove the last element of the snake
      // move the food to a new location
      moveFood();


    }
    else {
      snake.pop() //remove the last element of the snake
    }
  }



  function isGameOver (){
    // check snake body collision
    for(let i=1; i<snake.length; i++){
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
      }
    }
    // check wall collision
    const isHittingLeftWall = snake[0].x < 0;
    const isHittingRightWall = snake[0].x >= arenaSize;
    const isHittingTopWall = snake[0].y < 0;  
    const isHittingBottomWall = snake[0].y >= arenaSize;
    return isHittingLeftWall || isHittingRightWall || isHittingTopWall || isHittingBottomWall;
  }


  function gameLoop() {
    setInterval(() => {
      if(!gameStarted){
        return;
      }
      // 1. check if the snake has collided with the wall
      if(isGameOver()){
        gameStarted = false
        alert(`Game Over! Your Score is ${score}`);
        window.location.reload();
        return;
      }

      updateSnake();
      drawScoreBoard();
      drawFoodAndSnake();
    }, 500)
  }

  function runGame() {
    gameStarted = true;
    gameLoop();
  }

  function initiateGame() {
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "score-board";
    // scoreBoard.textContent = `10`;
    document.body.insertBefore(scoreBoard, gameArena);


    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.classList.add("start-button");
    document.body.appendChild(startButton);

    startButton.addEventListener("click", () => {
      gameStarted = true;
      startButton.style.display = "none";
      runGame();
    })
  }
  initiateGame()//first function to be executed so that we prepare the ui for the game
})