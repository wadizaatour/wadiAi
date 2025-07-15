import { ref } from "vue";

export function useGamePause() {
  const isPaused = ref(false);

  function togglePause() {
    isPaused.value = !isPaused.value;
  }

  function pause() {
    isPaused.value = true;
  }

  function resume() {
    isPaused.value = false;
  }

  return {
    isPaused,
    togglePause,
    pause,
    resume,
  };
}
