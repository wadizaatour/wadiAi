<template>
  <section class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Conversation Summary</h1>
    <ConversationSummary :summary="summary" />
    <div class="mt-6">
      <NuxtLink to="/dashboard" class="text-blue-600 hover:underline"
        >← Back to Dashboard</NuxtLink
      >
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ConversationSummary from "../components/ConversationSummary.vue";

const route = useRoute();
const summary = ref<any[]>([]);

onMounted(() => {
  const stored = localStorage.getItem("wadi_conversations");
  const conversations = stored ? JSON.parse(stored) : [];
  const idx = Number(route.query.id);
  if (!isNaN(idx) && conversations[idx]) {
    // Show first 6 messages (excluding system)
    summary.value = conversations[idx].messages.slice(1, 7);
    // Mark as read
    conversations[idx].read = true;
    localStorage.setItem("wadi_conversations", JSON.stringify(conversations));
  }
});
</script>
