<template>
  <div
    class="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow"
  >
    <h2 class="text-xl font-bold mb-2">Conversation Summary</h2>
    <div v-if="!summary" class="text-gray-400">No summary available.</div>
    <div v-else class="space-y-2">
      <div v-for="(item, idx) in summary" :key="idx" class="text-sm">
        <span
          v-if="item.role === 'user'"
          class="font-bold text-blue-700 dark:text-blue-300"
          >You:</span
        >
        <span v-else class="font-bold text-green-700 dark:text-green-300"
          >Wadi:</span
        >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ summary: Array<{ role: string; content: string }> }>();
</script>
