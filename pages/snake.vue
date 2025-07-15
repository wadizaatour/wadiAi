<template>
  <div
    v-if="showTransitionSkeleton"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center"
  >
    <div
      class="w-32 h-8 mb-6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"
    ></div>
    <div
      class="w-[90vw] max-w-[420px] h-[90vw] max-h-[420px] min-w-[220px] min-h-[220px] rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse mb-6"
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
        <template #title> Snake Game </template>
        <canvas
          ref="canvas"
          :width="canvasSize"
          :height="canvasSize"
          :class="[
            'border-green-400 dark:border-green-700',
            'rounded-lg border-2 bg-transparent dark:bg-transparent shadow-none',
          ]"
          style="
            width: 90vw;
            height: 90vw;
            max-width: 420px;
            max-height: 420px;
            min-width: 220px;
            min-height: 220px;
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
              class="text-2xl font-bold text-green-600 dark:text-green-300"
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
          <button
            @click="togglePause"
            :aria-label="isPaused ? 'Resume' : 'Pause'"
            class="focus:outline-none focus:ring-2 focus:ring-green-400 bg-transparent shadow-none p-0 m-0"
            style="background: none; box-shadow: none; border-radius: 0"
          >
            <svg
              v-if="!isPaused"
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-green-700 dark:text-green-300"
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
              class="h-8 w-8 text-green-700 dark:text-green-300"
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
            class="focus:outline-none focus:ring-2 focus:ring-green-400 bg-transparent shadow-none p-0 m-0"
            style="background: none; box-shadow: none; border-radius: 0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-green-700 dark:text-green-300"
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
        </template>
      </MobileGameLayout>
    </div>
    <div v-else>
      <DesktopGameLayout>
        <template #controls>
          <div class="absolute top-4 right-4 z-10">
            <div
              class="flex flex-row gap-3 bg-white/90 dark:bg-gray-800/90 rounded-xl px-3 py-2 items-center"
            >
              <button
                @click="togglePause"
                :aria-label="isPaused ? 'Resume' : 'Pause'"
                class="p-2 rounded-full bg-gradient-to-r from-green-400 to-green-700 text-white hover:scale-110 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-green-400"
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
                class="p-2 rounded-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white hover:scale-110 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-green-400"
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
        <template #title>Snake Game</template>
        <template #canvas>
          <canvas
            ref="canvas"
            :width="canvasSize"
            :height="canvasSize"
            :class="[
              'border-green-400 dark:border-green-700',
              'rounded-2xl border-4 bg-gradient-to-br from-green-100 via-green-200 to-green-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800',
            ]"
            style="
              width: 440px;
              height: 440px;
              display: block;
              margin: 0 auto;
              max-width: 100%;
              max-height: 60vw;
            "
          ></canvas>
        </template>
        <template #score>
          <div class="flex items-center gap-2">
            <span class="text-lg font-semibold text-gray-700 dark:text-gray-200"
              >Score:</span
            >
            <span
              class="text-2xl font-bold text-green-600 dark:text-green-300"
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
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useMobileDetection } from "../composables/useMobileDetection";
import MobileGameLayout from "../components/MobileGameLayout.vue";
import DesktopGameLayout from "../components/DesktopGameLayout.vue";
import { useGamePause } from "../composables/useGamePause";

// Mobile detection composable
const { isMobile, loading } = useMobileDetection();

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
  // Prevent scrolling on mobile
  if (typeof window !== "undefined" && window.innerWidth <= 640) {
    document.body.style.overflow = "hidden";
  }
});

const canvas = ref(null);
const canvasSize = 600;
const tileCount = 30;
const tileSize = canvasSize / tileCount;

const snake = ref([{ x: 10, y: 10 }]);
const direction = ref({ x: 0, y: 0 }); // No movement initially
const food = ref({ x: 5, y: 5 });
const score = ref(0);
const gameInterval = ref(null);
const gameOver = ref(false);

// Pause composable
const { isPaused, togglePause, pause, resume } = useGamePause();

function randomPosition() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

function draw() {
  const ctx = canvas.value.getContext("2d");
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw food
  ctx.fillStyle = "#f59e42";
  ctx.fillRect(
    food.value.x * tileSize,
    food.value.y * tileSize,
    tileSize,
    tileSize
  );

  // Draw snake
  ctx.fillStyle = "#4f46e5";
  snake.value.forEach((segment, idx) => {
    ctx.fillRect(
      segment.x * tileSize,
      segment.y * tileSize,
      tileSize,
      tileSize
    );
    if (idx === 0) {
      ctx.strokeStyle = "#fff";
      ctx.strokeRect(
        segment.x * tileSize,
        segment.y * tileSize,
        tileSize,
        tileSize
      );
    }
  });
}

function moveSnake() {
  if (isPaused.value || gameOver.value) return;
  // If no direction, don't move
  if (direction.value.x === 0 && direction.value.y === 0) {
    draw();
    return;
  }
  const newHead = {
    x: snake.value[0].x + direction.value.x,
    y: snake.value[0].y + direction.value.y,
  };

  // Check wall collision
  if (
    newHead.x < 0 ||
    newHead.x >= tileCount ||
    newHead.y < 0 ||
    newHead.y >= tileCount
  ) {
    endGame();
    return;
  }

  // Check self collision
  if (snake.value.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
    endGame();
    return;
  }

  snake.value.unshift(newHead);

  // Check food collision
  if (newHead.x === food.value.x && newHead.y === food.value.y) {
    score.value++;
    food.value = randomPosition();
  } else {
    snake.value.pop();
  }

  draw();
}

function handleKey(e) {
  // Prevent page scroll on arrow keys and pause
  const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "p", "P"];
  if (keys.includes(e.key)) {
    e.preventDefault();
  }
  if (e.key === "p" || e.key === "P") {
    togglePause();
    return;
  }
  if (isPaused.value) return;
  switch (e.key) {
    case "ArrowUp":
      if (direction.value.y !== 1) direction.value = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.value.y !== -1) direction.value = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.value.x !== 1) direction.value = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.value.x !== -1) direction.value = { x: 1, y: 0 };
      break;
  }
}

function endGame() {
  gameOver.value = true;
  clearInterval(gameInterval.value);
  setTimeout(() => {
    alert("Game Over! Your score: " + score.value);
  }, 100);
}

function resetGame() {
  snake.value = [{ x: 10, y: 10 }];
  direction.value = { x: 0, y: 0 }; // No movement until key pressed
  food.value = randomPosition();
  score.value = 0;
  gameOver.value = false;
  resume();
  draw();
  clearInterval(gameInterval.value);
  gameInterval.value = setInterval(moveSnake, 120);
}

onMounted(() => {
  draw();
  window.addEventListener("keydown", handleKey);
  gameInterval.value = setInterval(moveSnake, 120);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKey);
  clearInterval(gameInterval.value);
});
</script>

<style scoped>
canvas {
  image-rendering: pixelated;
  max-width: 100vw;
  height: auto;
}
</style>
