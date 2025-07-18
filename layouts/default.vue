<template>
  <ColorScheme />
  <div
    class="flex h-screen flex-col sm:flex-row bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
  >
    <!-- Mobile menu button -->
    <button
      @click="toggleSidebar"
      :aria-expanded="sidebarOpen.toString()"
      class="md:hidden p-4 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:focus:ring-gray-300"
      aria-label="Toggle sidebar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-600 dark:text-gray-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- Sidebar -->
    <aside
      :class="[
        'bg-white dark:bg-gray-900 shadow-md flex flex-col fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'sm:translate-x-0 sm:static sm:inset-auto sm:w-64',
        'md:w-72 lg:w-80',
      ]"
    >
      <div
        class="p-6 text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-600 dark:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>Senior Frontend Engineer</span>
        <button
          @click="
            $colorMode.preference =
              $colorMode.preference === 'dark' ? 'light' : 'dark'
          "
          class="ml-auto flex items-center gap-2 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          aria-label="Toggle dark mode"
        >
          <svg
            v-if="$colorMode.preference === 'dark'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.95l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-4">
        <NuxtLink
          to="/"
          class="flex items-center py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-700 dark:hover:text-indigo-400 transition space-x-2"
          active-class="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold"
          @click="closeSidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"
            />
          </svg>
          <span>Home</span>
        </NuxtLink>

        <!-- Project expandable menu -->
        <div>
          <button
            @click="projectMenuOpen = !projectMenuOpen"
            class="flex items-center w-full py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-700 dark:hover:text-indigo-400 transition space-x-2 focus:outline-none"
            :aria-expanded="projectMenuOpen.toString()"
            aria-label="Toggle Project menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            <span>Project</span>
            <svg
              :class="[
                'ml-auto transition-transform',
                projectMenuOpen ? 'rotate-90' : '',
              ]"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div v-if="projectMenuOpen" class="pl-6 space-y-2 mt-2">
            <NuxtLink
              to="/weather"
              class="flex items-center py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-700 dark:hover:text-indigo-400 transition space-x-2"
              active-class="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold"
              @click="closeSidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 15a4 4 0 014-4h1a4 4 0 014 4v1a4 4 0 01-4 4H7a4 4 0 01-4-4v-1z"
                />
              </svg>
              <span>Weather App</span>
            </NuxtLink>
            <NuxtLink
              to="/tetris"
              class="flex items-center py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-700 dark:hover:text-purple-400 transition space-x-2"
              active-class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-bold"
              @click="closeSidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect
                  x="3"
                  y="3"
                  width="7"
                  height="7"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="14"
                  y="3"
                  width="7"
                  height="7"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="3"
                  y="14"
                  width="7"
                  height="7"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="14"
                  y="14"
                  width="7"
                  height="7"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
              <span>Tetris Game</span>
            </NuxtLink>
            <NuxtLink
              to="/ask-ai"
              class="flex items-center py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-700 dark:hover:text-indigo-400 transition space-x-2"
              active-class="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold"
              @click="closeSidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16h6"
                />
              </svg>
              <span>Ask AI</span>
            </NuxtLink>
            <NuxtLink
              to="/snake"
              class="flex items-center py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-700 dark:hover:text-green-400 transition space-x-2"
              active-class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold"
              @click="closeSidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 12c0-4 8-4 8 0s8 4 8 0"
                />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
              <span>Snake Game</span>
            </NuxtLink>
            <NuxtLink
              v-if="!isMobile"
              to="/pacman"
              class="flex items-center py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-yellow-500 dark:hover:text-yellow-400 transition space-x-2"
              active-class="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 font-bold"
              @click="closeSidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" fill="currentColor" />
                <path
                  d="M22 12a10 10 0 0 1-10 10A10 10 0 0 1 2 12a10 10 0 0 1 10-10c2.21 0 4.25.72 5.9 1.93L12 12l7.9-7.9A9.96 9.96 0 0 1 22 12z"
                  fill="#111"
                />
                <circle cx="15.5" cy="9" r="1.5" fill="#fff" />
              </svg>
              <span>Pac-Man</span>
            </NuxtLink>
          </div>
        </div>

        <NuxtLink
          to="/blogs"
          class="flex items-center py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-700 dark:hover:text-indigo-400 transition space-x-2"
          active-class="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold"
          @click="closeSidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-3 2 3h4a2 2 0 012 2v12a2 2 0 01-2 2z"
            />
          </svg>
          <span>Blogs</span>
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="flex items-center py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-700 dark:hover:text-indigo-400 transition space-x-2"
          active-class="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold"
          @click="closeSidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16 12a4 4 0 01-8 0 4 4 0 018 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 14v7m0 0H9m3 0h3"
            />
          </svg>
          <span>Contact</span>
        </NuxtLink>
        <NuxtLink
          to="/dashboard"
          class="flex items-center py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-700 dark:hover:text-indigo-400 transition space-x-2 relative"
          active-class="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold"
          @click="closeSidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          <span class="flex items-center w-full">
            <span>Dashboard</span>
            <span
              v-if="conversationCount > 0"
              class="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full min-w-[1.5em]"
              style="margin-left: auto"
            >
              {{ conversationCount }}
            </span>
          </span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main content -->
    <main
      class="flex-1 overflow-y-auto p-4 sm:p-8 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    >
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useConversationStore } from "../stores/conversationStore";
import { useMobileDetection } from "../composables/useMobileDetection";
const sidebarOpen = ref(false);
const projectMenuOpen = ref(false);
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
function closeSidebar() {
  sidebarOpen.value = false;
}

// Conversation notification badge logic
const conversationStore = useConversationStore();
const conversationCount = computed(
  () => conversationStore.conversations.length
);
onMounted(() => {
  conversationStore.loadConversations();
});

// Mobile detection
const { isMobile } = useMobileDetection();
</script>

<style scoped>
/* Scoped styles if needed */
</style>
