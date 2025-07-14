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
          class="flex items-center py-2 px-3 rounded hover:bg-gray-100 transition space-x-2"
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
        <NuxtLink
          to="/weather"
          class="flex items-center py-2 px-3 rounded hover:bg-gray-100 transition space-x-2"
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
          to="/blogs"
          class="flex items-center py-2 px-3 rounded hover:bg-gray-100 transition space-x-2"
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
          class="flex items-center py-2 px-3 rounded hover:bg-gray-100 transition space-x-2"
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
          to="/ask-ai"
          class="flex items-center py-2 px-3 rounded hover:bg-gray-100 transition space-x-2"
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
import { ref } from "vue";
const sidebarOpen = ref(false);
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
function closeSidebar() {
  sidebarOpen.value = false;
}
</script>

<style scoped>
/* Scoped styles if needed */
</style>
