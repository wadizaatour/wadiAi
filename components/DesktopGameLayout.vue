<template>
  <div
    class="fixed inset-0 flex items-center justify-center min-h-screen w-full bg-transparent z-10"
    style="z-index: 10"
  >
    <div
      class="relative flex flex-col items-center w-full max-w-[520px] min-h-[540px] rounded-3xl bg-white/80 dark:bg-gray-900/80 p-6"
    >
      <slot name="controls"></slot>
      <h1
        class="text-3xl font-extrabold tracking-tight text-green-700 dark:text-green-300 drop-shadow mb-4"
      >
        <slot name="title">Game</slot>
      </h1>
      <slot name="canvas"></slot>
      <div class="mt-6 w-full flex flex-col items-center">
        <slot name="score"></slot>
        <slot name="gameover"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for layout wrapper
</script>

<style scoped>
/* No shadow styles here, only layout */
</style>
