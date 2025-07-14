<template>
  <div
    class="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg mb-6"
  >
    <div class="text-2xl font-bold text-blue-700 dark:text-blue-200">
      {{ total }}
    </div>
    <div class="text-gray-700 dark:text-gray-200">Total Conversations</div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ total: number }>();
</script>
