<template>
  <section class="max-w-4xl mx-auto p-6 space-y-6">
    <h1 class="text-3xl font-bold mb-4">Ask Wadi</h1>
    <p class="mb-4 text-gray-700">
      This chatbot represents Wadi zaatour and can do mock interviews with
      recruiters or answer your questions.<br />
      <span class="text-xs text-gray-500"
        >(built by Wadi zaatour <code>.env</code>.)</span
      >
    </p>
    <AskAIChat
      :messages="messages"
      :loading="loading"
      :animatedContent="animatedContent"
    >
      <template #after-message="{ msg, i }">
        <div
          v-if="
            msg.role === 'assistant' &&
            (msg.content ===
              'When we schedule a call we can talk about this.' ||
              msg.content ===
                'We can talk about it in a private conversation.') &&
            messages.length - 1 - i === messages.length - 1
          "
          class="mt-2"
        >
          <button
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
            @click="onScheduleCall"
          >
            📅 Schedule a Call
          </button>
        </div>
      </template>
    </AskAIChat>
    <AskAISuggestions
      :suggestions="getCurrentSuggestions()"
      :loading="loading"
      :ttsEnabled="ttsEnabled"
      @select="selectSuggestion"
      @toggle-tts="ttsEnabled = !ttsEnabled"
    />
    <form
      @submit.prevent="sendMessage"
      class="flex gap-2 mt-2 sticky bottom-0 bg-white dark:bg-gray-800 p-2 z-10 border-t border-gray-200 dark:border-gray-700"
    >
      <input
        v-model="input"
        type="text"
        class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-gray-100"
        placeholder="Ask a question or start a mock interview..."
        :disabled="loading"
      />
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        :disabled="loading || !input.trim() "
      >
        
        <span >Send</span>
      </button>
    </form>
    <button
      @click="startNewChat"
      class="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400"
      title="Start new chat"
      aria-label="Start new chat"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  </section>
</template>

<script lang="ts" setup>
import { useAskAI } from "../composables/useAskAI";
import { useRouter } from "vue-router";
import AskAIChat from "../components/AskAIChat.vue";
import AskAISuggestions from "../components/AskAISuggestions.vue";

const {
  input,
  loading,
  puterReady,
  messages,
  animatedContent,
  ttsEnabled,
  suggestionStep,
  orderedSuggestions,
  getCurrentSuggestions,
  speak,
  saveConversation,
  startNewChat,
  typeTextEffect,
  recruiterQuestions,
  getAIResponse,
  sendMessage,
} = useAskAI();

const router = useRouter();
function onScheduleCall() {
  router.push("/contact");
}

function selectSuggestion(s: string) {
  if (loading.value) return;
  input.value = s;
  sendMessage();
}
</script>

<style scoped>
.fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
