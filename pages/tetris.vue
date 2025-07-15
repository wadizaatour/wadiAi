<template>
  <div
    v-if="showTransitionSkeleton"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80"
  >
    <div
      class="w-32 h-8 mb-6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"
    ></div>
    <div
      class="w-[90vw] max-w-xs h-[162vw] max-h-[576px] min-w-[120px] min-h-[216px] rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse mb-6"
    ></div>
    <div class="flex flex-row gap-8 w-full justify-center pb-6">
      <div
        class="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"
      ></div>
      <div
        class="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"
      ></div>
    </div>
  </div>
  <div v-else>
    <div v-if="isMobile">
      <MobileGameLayout>
        <template #title> Tetris </template>
        <canvas
          ref="canvas"
          :width="canvasWidth"
          :height="canvasHeight"
          :class="[
            'border-indigo-400 dark:border-indigo-700',
            'rounded-lg border-2 bg-transparent dark:bg-transparent shadow-none',
          ]"
          style="
            width: 90vw;
            height: 162vw;
            max-width: 320px;
            max-height: 576px;
            min-width: 120px;
            min-height: 216px;
            display: block;
            margin: 0 auto;
            touch-action: none;
            box-sizing: border-box;
          "
        ></canvas>
        <template #score>
          <div class="flex items-center gap-2 justify-center">
            <span class="text-lg font-semibold text-gray-700 dark:text-gray-200"
              >Score:</span
            >
            <span
              class="text-2xl font-bold text-indigo-600 dark:text-indigo-300"
              >{{ score }}</span
            >
          </div>
        </template>
        <template #gameover>
          <p
            v-if="gameOver"
            class="mt-2 text-lg font-bold text-red-600 dark:text-red-400 animate-bounce"
          >
            Game Over!
          </p>
        </template>
        <template #controls>
          <div
            class="flex flex-row justify-center items-center gap-8 w-full pb-6"
          >
            <button
              @click="togglePause"
              :aria-label="isPaused ? 'Resume' : 'Pause'"
              class="focus:outline-none p-0 m-0"
              style="
                background: none;
                border: none;
                box-shadow: none;
                padding: 0;
                margin: 0;
              "
            >
              <svg
                v-if="!isPaused"
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-indigo-700 dark:text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect
                  x="6"
                  y="4"
                  width="4"
                  height="16"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="14"
                  y="4"
                  width="4"
                  height="16"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-indigo-700 dark:text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <polygon points="6,4 20,12 6,20" fill="currentColor" />
              </svg>
            </button>
            <button
              @click="resetGame"
              :aria-label="'Restart'"
              class="focus:outline-none p-0 m-0"
              style="
                background: none;
                border: none;
                box-shadow: none;
                padding: 0;
                margin: 0;
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-indigo-700 dark:text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582M19.418 19A9 9 0 104.582 9"
                />
              </svg>
            </button>
          </div>
        </template>
      </MobileGameLayout>
    </div>
    <DesktopGameLayout v-if="!hideDesktop">
      <template #controls>
        <div class="absolute top-4 right-4 z-10">
          <div
            class="flex flex-row gap-3 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow px-3 py-2 items-center"
          >
            <button
              @click="togglePause"
              :aria-label="isPaused ? 'Resume' : 'Pause'"
              class="p-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white shadow hover:scale-110 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <svg
                v-if="!isPaused"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect
                  x="6"
                  y="4"
                  width="4"
                  height="16"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="14"
                  y="4"
                  width="4"
                  height="16"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <polygon points="6,4 20,12 6,20" fill="currentColor" />
              </svg>
            </button>
            <button
              @click="resetGame"
              :aria-label="'Restart'"
              class="p-2 rounded-full bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-white shadow hover:scale-110 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582M19.418 19A9 9 0 104.582 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </template>
      <template #title> Tetris </template>
      <template #canvas>
        <canvas
          ref="canvas"
          :width="canvasWidth"
          :height="canvasHeight"
          class="rounded-2xl border-4 border-indigo-400 dark:border-indigo-700 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-lg"
        ></canvas>
      </template>
      <template #score>
        <div class="flex items-center gap-2">
          <span class="text-lg font-semibold text-gray-700 dark:text-gray-200"
            >Score:</span
          >
          <span
            class="text-2xl font-bold text-indigo-600 dark:text-indigo-300"
            >{{ score }}</span
          >
        </div>
      </template>
      <template #gameover>
        <p
          v-if="gameOver"
          class="mt-4 text-lg font-bold text-red-600 dark:text-red-400 animate-bounce"
        >
          Game Over!
        </p>
      </template>
    </DesktopGameLayout>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useMobileDetection } from "../composables/useMobileDetection";
import MobileGameLayout from "../components/MobileGameLayout.vue";
import { useGamePause } from "../composables/useGamePause";
import DesktopGameLayout from "../components/DesktopGameLayout.vue";
import { useHideDesktopOnMobile } from "../composables/useHideDesktopOnMobile";

const canvas = ref(null);
const rows = 20;
const cols = 10;
const blockSize = 30;
const canvasWidth = cols * blockSize;
const canvasHeight = rows * blockSize;

const score = ref(0);
const gameInterval = ref(null);
const board = ref(Array.from({ length: rows }, () => Array(cols).fill(0)));
const current = ref(null);
const gameOver = ref(false);

// Pause composable
const { isPaused, togglePause, pause, resume } = useGamePause();

// Mobile detection composable
const { isMobile, loading } = useMobileDetection();
// Hide desktop layout on mobile
const { hideDesktop } = useHideDesktopOnMobile();

// Show skeleton only on mobile/desktop switch
const showTransitionSkeleton = ref(false);
let prevIsMobile = isMobile.value;

watch(isMobile, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    showTransitionSkeleton.value = true;
    setTimeout(() => {
      showTransitionSkeleton.value = false;
    }, 700); // adjust duration as needed
  }
  prevIsMobile = newVal;
});

onMounted(() => {
  showTransitionSkeleton.value = false;
});

const tetrominoes = [
  // I
  [[1, 1, 1, 1]],
  // J
  [
    [2, 0, 0],
    [2, 2, 2],
  ],
  // L
  [
    [0, 0, 3],
    [3, 3, 3],
  ],
  // O
  [
    [4, 4],
    [4, 4],
  ],
  // S
  [
    [0, 5, 5],
    [5, 5, 0],
  ],
  // T
  [
    [0, 6, 0],
    [6, 6, 6],
  ],
  // Z
  [
    [7, 7, 0],
    [0, 7, 7],
  ],
];

const colors = [
  "rgba(0,0,0,0)", // 0: empty
  "#06b6d4", // 1: I - cyan-500
  "#6366f1", // 2: J - indigo-500
  "#f59e42", // 3: L - orange-400
  "#fde047", // 4: O - yellow-300
  "#22d3ee", // 5: S - teal-400
  "#a21caf", // 6: T - purple-700
  "#ef4444", // 7: Z - red-500
];

function randomTetromino() {
  const type = Math.floor(Math.random() * tetrominoes.length);
  return {
    shape: tetrominoes[type],
    x: Math.floor(cols / 2) - Math.ceil(tetrominoes[type][0].length / 2),
    y: 0,
    type: type + 1,
  };
}

function draw() {
  const ctx = canvas.value.getContext("2d");
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // Draw board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = colors[board.value[r][c]];
      ctx.shadowColor = board.value[r][c] ? "#0006" : "transparent";
      ctx.shadowBlur = board.value[r][c] ? 8 : 0;
      ctx.fillRect(c * blockSize, r * blockSize, blockSize, blockSize);
      ctx.shadowBlur = 0;
      if (board.value[r][c]) {
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          c * blockSize + 1,
          r * blockSize + 1,
          blockSize - 2,
          blockSize - 2
        );
      }
    }
  }
  // Draw current tetromino
  if (current.value) {
    for (let r = 0; r < current.value.shape.length; r++) {
      for (let c = 0; c < current.value.shape[r].length; c++) {
        if (current.value.shape[r][c]) {
          ctx.fillStyle = colors[current.value.type];
          ctx.shadowColor = "#0008";
          ctx.shadowBlur = 12;
          ctx.fillRect(
            (current.value.x + c) * blockSize,
            (current.value.y + r) * blockSize,
            blockSize,
            blockSize
          );
          ctx.shadowBlur = 0;
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            (current.value.x + c) * blockSize + 1,
            (current.value.y + r) * blockSize + 1,
            blockSize - 2,
            blockSize - 2
          );
        }
      }
    }
  }
}

function collide(shape, x, y) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (
        shape[r][c] &&
        (board.value[y + r] && board.value[y + r][x + c]) !== 0
      ) {
        return true;
      }
      if (shape[r][c] && (y + r >= rows || x + c < 0 || x + c >= cols)) {
        return true;
      }
    }
  }
  return false;
}

function merge() {
  for (let r = 0; r < current.value.shape.length; r++) {
    for (let c = 0; c < current.value.shape[r].length; c++) {
      if (current.value.shape[r][c]) {
        board.value[current.value.y + r][current.value.x + c] =
          current.value.type;
      }
    }
  }
}

function rotate(shape) {
  return shape[0].map((_, i) => shape.map((row) => row[i]).reverse());
}

function drop() {
  if (isPaused.value || !current.value) return;
  if (!collide(current.value.shape, current.value.x, current.value.y + 1)) {
    current.value.y++;
  } else {
    merge();
    clearLines();
    spawn();
    if (collide(current.value.shape, current.value.x, current.value.y)) {
      endGame();
    }
  }
  draw();
}

function move(dx) {
  if (!current.value) return;
  if (!collide(current.value.shape, current.value.x + dx, current.value.y)) {
    current.value.x += dx;
    draw();
  }
}

function hardDrop() {
  if (!current.value) return;
  while (!collide(current.value.shape, current.value.x, current.value.y + 1)) {
    current.value.y++;
  }
  drop();
}

function rotateTetromino() {
  if (!current.value) return;
  const rotated = rotate(current.value.shape);
  if (!collide(rotated, current.value.x, current.value.y)) {
    current.value.shape = rotated;
    draw();
  }
}

function clearLines() {
  let lines = 0;
  for (let r = rows - 1; r >= 0; r--) {
    if (board.value[r].every((cell) => cell !== 0)) {
      board.value.splice(r, 1);
      board.value.unshift(Array(cols).fill(0));
      lines++;
      r++;
    }
  }
  if (lines > 0) {
    score.value += lines * 100;
  }
}

function spawn() {
  current.value = randomTetromino();
}

function handleKey(e) {
  // Prevent page scroll on arrow keys, space, and pause
  const keys = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    " ",
    "Spacebar",
    "p",
    "P",
  ];
  if (keys.includes(e.key)) {
    e.preventDefault();
  }
  if (gameOver.value) return;
  if (e.key === "p" || e.key === "P") {
    togglePause();
    return;
  }
  if (isPaused.value) return;
  switch (e.key) {
    case "ArrowLeft":
      move(-1);
      break;
    case "ArrowRight":
      move(1);
      break;
    case "ArrowDown":
      drop();
      break;
    case "ArrowUp":
      rotateTetromino();
      break;
    case " ":
    case "Spacebar":
      hardDrop();
      break;
  }
}

function endGame() {
  gameOver.value = true;
  clearInterval(gameInterval.value);
  // No alert, just show message in UI
}

function resetGame() {
  board.value = Array.from({ length: rows }, () => Array(cols).fill(0));
  score.value = 0;
  gameOver.value = false;
  resume();
  spawn();
  draw();
  clearInterval(gameInterval.value);
  gameInterval.value = setInterval(() => drop(), 400);
}

onMounted(() => {
  resetGame();
  window.addEventListener("keydown", handleKey);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKey);
  clearInterval(gameInterval.value);
});
</script>

<style scoped>
canvas {
  image-rendering: pixelated;
  box-shadow: 0 8px 40px 0 rgba(80, 0, 120, 0.18);
  transition: box-shadow 0.2s, border 0.2s;
}

body,
.tetris-modern {
  font-family: "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial,
    "sans-serif";
}
</style>
