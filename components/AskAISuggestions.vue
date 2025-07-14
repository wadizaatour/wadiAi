<template>
  <div class="flex flex-wrap gap-2 mb-4 items-center">
    <button
      v-for="(q, idx) in suggestions"
      :key="idx"
      type="button"
      class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition text-sm"
      @click="$emit('select', q)"
      :disabled="loading"
    >
      {{ q }}
    </button>
    <button
      type="button"
      class="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition text-sm"
      @click="$emit('toggle-tts')"
      :aria-pressed="ttsEnabled"
    >
      <span v-if="ttsEnabled">🔊 Voice On</span>
      <span v-else>🔇 Voice Off</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  suggestions: string[];
  loading: boolean;
  ttsEnabled: boolean;
}>();
</script>
