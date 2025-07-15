<template>
  <div
    v-if="showTransitionSkeleton"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80"
  >
    <div
      class="w-32 h-8 mb-6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"
    ></div>
    <div
      class="w-[90vw] max-w-[600px] h-[66vw] max-h-[440px] min-w-[220px] min-h-[160px] rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse mb-6"
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
      <!-- Pac-Man game is hidden on mobile -->
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
              class="p-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow hover:scale-110 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              @click="
                () => {
                  if (window.startPacman)
                    window.startPacman('#pacman-container');
                }
              "
              :aria-label="'Restart'"
              class="p-2 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white shadow hover:scale-110 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
      <template #title> Pac-Man Game </template>
      <template #canvas>
        <div
          id="pacman-container"
          class="mx-auto"
          style="
            width: 600px;
            height: 440px;
            max-width: 100%;
            max-height: 100%;
            background: #111;
            border-radius: 16px;
            box-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
          "
        ></div>
      </template>
    </DesktopGameLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import { useMobileDetection } from "../composables/useMobileDetection";
import MobileGameLayout from "../components/MobileGameLayout.vue";
import { useGamePause } from "../composables/useGamePause";
import DesktopGameLayout from "../components/DesktopGameLayout.vue";
import { useHideDesktopOnMobile } from "../composables/useHideDesktopOnMobile";
// Add type to window for TypeScript
declare global {
  interface Window {
    startPacman?: (selector: string) => void;
    pausePacman?: () => void;
    resumePacman?: () => void;
  }
}

const { isPaused, togglePause } = useGamePause();

watch(isPaused, (val) => {
  if (typeof window !== "undefined") {
    if (val && typeof window.pausePacman === "function") {
      window.pausePacman();
    } else if (!val && typeof window.resumePacman === "function") {
      window.resumePacman();
    }
  }
});

onMounted(() => {
  if (
    typeof window !== "undefined" &&
    typeof window.startPacman === "function"
  ) {
    window.startPacman("#pacman-container");
  }
});

// Mobile detection composable
const { isMobile, loading } = useMobileDetection();
// Hide desktop layout on mobile
const { hideDesktop } = useHideDesktopOnMobile();

// Show skeleton only on mobile/desktop switch
const showTransitionSkeleton = ref(false);
let prevIsMobile = isMobile.value;

watch(isMobile, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    showTransitionSkeleton.value = true;
    setTimeout(async () => {
      showTransitionSkeleton.value = false;
      // Wait for DOM update, then start Pacman if container exists
      await nextTick();
      if (
        typeof window !== "undefined" &&
        typeof window.startPacman === "function" &&
        document.getElementById("pacman-container")
      ) {
        window.startPacman("#pacman-container");
      }
    }, 700); // adjust duration as needed
  }
  prevIsMobile = newVal;
});

onMounted(async () => {
  showTransitionSkeleton.value = false;
  await nextTick();
  if (
    typeof window !== "undefined" &&
    typeof window.startPacman === "function" &&
    document.getElementById("pacman-container")
  ) {
    window.startPacman("#pacman-container");
  }
});
</script>

<style scoped>
#pacman-container {
  width: 600px;
  height: 440px;
  margin: 0 auto;
  background: #111;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
}
</style>
