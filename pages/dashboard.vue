<template>
  <section class="max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Conversation Dashboard</h1>
    <ConversationStats :total="filteredConversations.length" />
    <div class="mb-4 flex flex-wrap gap-2 items-center">
      <input
        v-model="search"
        type="text"
        placeholder="Filter by keyword..."
        class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-gray-100"
      />
      <input
        v-model="dateFilter"
        type="date"
        class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-gray-100"
      />
    </div>
    <div v-if="filteredConversations.length === 0" class="text-gray-500">
      No conversations found.
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="(conv, idx) in filteredConversations"
        :key="idx"
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition cursor-pointer"
        @click="openConversation(idx)"
      >
        <div
          class="font-semibold text-lg mb-2 flex justify-between items-center"
        >
          <span>Conversation #{{ idx + 1 }}</span>
          <span class="text-xs text-gray-400">
            {{ formatDate(conv.date) }}
          </span>
        </div>
        <div class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          <div v-for="(msg, i) in conv.messages.slice(1, 4)" :key="i">
            <span v-if="msg.role === 'user'" class="font-bold">You:</span>
            <span v-else class="font-bold">Wadi:</span>
            {{ msg.content }}
          </div>
        </div>
        <div class="mt-2 text-xs text-gray-400">
          Messages: {{ conv.messages.length - 1 }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import ConversationStats from "../components/ConversationStats.vue";
//to improve sotring conversations
const conversations = ref<any[]>([]);
const router = useRouter();
const search = ref("");
const dateFilter = ref("");

function loadConversations() {
  const stored = localStorage.getItem("wadi_conversations");
  const arr = stored ? JSON.parse(stored) : [];
  // Attach date if not present (for backward compatibility)
  conversations.value = arr.map((c: any) => {
    if (c.date) return c;
    return { date: new Date().toISOString(), messages: c };
  });
  // Save back with date for future
  localStorage.setItem(
    "wadi_conversations",
    JSON.stringify(conversations.value)
  );
}

const filteredConversations = computed(() => {
  return conversations.value.filter((conv) => {
    const matchesDate =
      !dateFilter.value || conv.date.startsWith(dateFilter.value);
    const matchesSearch =
      !search.value ||
      conv.messages.some((msg: any) =>
        msg.content.toLowerCase().includes(search.value.toLowerCase())
      );
    return matchesDate && matchesSearch;
  });
});

function openConversation(idx: number) {
  router.push({ path: "/conversation", query: { id: idx } });
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return (
    d.toLocaleDateString() +
    " " +
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
}

onMounted(() => {
  loadConversations();
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
