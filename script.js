console.log("Script is Working");

document.addEventListener("DOMContentLoaded", () => {
    const gameArena = document.getElementById("game-arena");

    const arenaSize = 450
    const cellSize = 20;
    let score = 0;
    let gameStarted = false;
    let food = { x: 300, y: 200 };
    let snake = [{ x: 160, y: 200 }, { x: 140, y: 200 }, { x: 120, y: 200 }, { x: 100, y: 200 }];
    let dx = cellSize;
    let dy = 0;

    function startGame(){
      const scoreBoard = document.createElement("div");
      scoreBoard.id = "score-board";
      // scoreBoard.textContent = `10`;
      document.body.insertBefore(scoreBoard, gameArena);


      const startButton = document.createElement("button");
      startButton.textContent = "Start Game";
      startButton.classList.add("start-button");
      document.body.appendChild(startButton);
    }
    startGame()
})