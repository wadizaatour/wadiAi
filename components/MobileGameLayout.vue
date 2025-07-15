<template>
  <div class="flex flex-col items-center w-full min-h-screen bg-transparent">
    <h1
      class="text-2xl font-extrabold tracking-tight text-green-700 dark:text-green-300 drop-shadow mb-2 mt-2 text-center w-full sticky top-0 z-20 bg-transparent"
      style="backdrop-filter: blur(2px)"
    >
      <slot name="title">Game</slot>
    </h1>
    <div class="flex-1 w-full flex flex-col items-center justify-center">
      <slot />
    </div>
    <div class="mt-4 w-full flex flex-col items-center">
      <slot name="score" />
      <slot name="gameover" />
    </div>
    <div
      class="fixed bottom-0 left-0 w-full flex flex-row gap-6 bg-transparent px-3 py-2 items-center justify-center z-30 mb-[72px]"
    >
      <slot name="controls" />
    </div>
  </div>
</template>

<script setup>
// No script needed for this layout
</script>

<style scoped>
.flex-1 {
  flex: 1 1 0%;
}
</style>
