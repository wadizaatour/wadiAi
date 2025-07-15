// public/pacman.js

window.startPacman = function (containerSelector) {
  const container = document.querySelector(containerSelector);
  container.innerHTML =
    '<canvas id="pacman-canvas" width="600" height="440"></canvas>';
  const canvas = document.getElementById("pacman-canvas");
  const ctx = canvas.getContext("2d");

  // Enhanced map: 0 = empty, 1 = wall, 2 = dot
  const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  const tileSize = 40;
  let pacman = { x: 1, y: 1, dir: "right" };
  let score = 0;
  let gameOver = false;

  // Add a simple enemy (ghost)
  let ghost = { x: 7, y: 5, color: "#f55" };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw map
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === 1) {
          ctx.fillStyle = "#222";
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        } else if (map[y][x] === 2) {
          ctx.fillStyle = "yellow";
          ctx.beginPath();
          ctx.arc(
            x * tileSize + tileSize / 2,
            y * tileSize + tileSize / 2,
            5,
            0,
            2 * Math.PI
          );
          ctx.fill();
        }
      }
    }
    // Draw Pac-Man
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    let angle = 0.2 * Math.PI;
    let start = 0,
      end = 2 * Math.PI;
    if (pacman.dir === "right") {
      start = angle;
      end = 2 * Math.PI - angle;
    }
    if (pacman.dir === "left") {
      start = Math.PI + angle;
      end = Math.PI - angle;
    }
    if (pacman.dir === "up") {
      start = 1.5 * Math.PI + angle;
      end = 1.5 * Math.PI - angle;
    }
    if (pacman.dir === "down") {
      start = 0.5 * Math.PI + angle;
      end = 0.5 * Math.PI - angle;
    }
    ctx.arc(
      pacman.x * tileSize + tileSize / 2,
      pacman.y * tileSize + tileSize / 2,
      tileSize / 2 - 2,
      start,
      end,
      false
    );
    ctx.lineTo(
      pacman.x * tileSize + tileSize / 2,
      pacman.y * tileSize + tileSize / 2
    );
    ctx.fill();

    // Draw ghost
    ctx.fillStyle = ghost.color;
    ctx.beginPath();
    ctx.arc(
      ghost.x * tileSize + tileSize / 2,
      ghost.y * tileSize + tileSize / 2,
      tileSize / 2 - 4,
      Math.PI,
      0,
      false
    );
    ctx.lineTo(
      ghost.x * tileSize + tileSize - 8,
      ghost.y * tileSize + tileSize - 8
    );
    ctx.lineTo(ghost.x * tileSize + 8, ghost.y * tileSize + tileSize - 8);
    ctx.closePath();
    ctx.fill();
    // Eyes
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(
      ghost.x * tileSize + tileSize / 2 - 8,
      ghost.y * tileSize + tileSize / 2 - 4,
      4,
      0,
      2 * Math.PI
    );
    ctx.arc(
      ghost.x * tileSize + tileSize / 2 + 8,
      ghost.y * tileSize + tileSize / 2 - 4,
      4,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(
      ghost.x * tileSize + tileSize / 2 - 8,
      ghost.y * tileSize + tileSize / 2 - 4,
      2,
      0,
      2 * Math.PI
    );
    ctx.arc(
      ghost.x * tileSize + tileSize / 2 + 8,
      ghost.y * tileSize + tileSize / 2 - 4,
      2,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Draw score
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 10, canvas.height - 10);

    // Game over
    if (gameOver) {
      ctx.fillStyle = "#f55";
      ctx.font = "48px Arial";
      ctx.fillText("Game Over!", 160, 220);
    }
  }

  function move(dx, dy, dir) {
    if (gameOver) return;
    let nx = pacman.x + dx;
    let ny = pacman.y + dy;
    if (map[ny][nx] !== 1) {
      pacman.x = nx;
      pacman.y = ny;
      pacman.dir = dir;
      if (map[ny][nx] === 2) {
        map[ny][nx] = 0;
        score += 10;
      }
    }
    // Check collision with ghost
    if (pacman.x === ghost.x && pacman.y === ghost.y) {
      gameOver = true;
    }
  }

  function moveGhost() {
    if (gameOver) return;
    // Try random directions until a valid move is found
    const dirs = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];
    let validMoves = dirs.filter(
      (d) => map[ghost.y + d.dy][ghost.x + d.dx] !== 1
    );
    if (validMoves.length > 0) {
      let move = validMoves[Math.floor(Math.random() * validMoves.length)];
      ghost.x += move.dx;
      ghost.y += move.dy;
    }
    // Check collision with Pac-Man
    if (pacman.x === ghost.x && pacman.y === ghost.y) {
      gameOver = true;
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") move(1, 0, "right");
    if (e.key === "ArrowLeft") move(-1, 0, "left");
    if (e.key === "ArrowUp") move(0, -1, "up");
    if (e.key === "ArrowDown") move(0, 1, "down");
    draw();
  });

  function gameLoop() {
    moveGhost();
    draw();
    if (!gameOver) {
      setTimeout(gameLoop, 400);
    }
  }

  draw();
  gameLoop();
};
