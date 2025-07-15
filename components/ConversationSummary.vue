<template>
  <div
    class="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold">Conversation Summary</h2>
      <div
        class="flex gap-4 items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-2 shadow-sm"
      >
        <!-- Interview Phase Icon Buttons -->
        <button
          v-for="phase in interviewPhases"
          :key="phase.value"
          :title="phase.label"
          type="button"
          @click="selectedPhase = phase.value"
          :class="[
            'p-0 m-0 border-none bg-transparent focus:outline-none',
            selectedPhase === phase.value
              ? 'text-blue-600 scale-110'
              : 'text-gray-500 hover:text-blue-400',
          ]"
        >
          <span v-if="phase.value === 'behavior'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 0c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 8v-2a4 4 0 00-4-4H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2h-3a4 4 0 00-4 4z"
              />
            </svg>
          </span>
          <span v-else-if="phase.value === 'technical'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.75 17L8 21m6.25-4l1.75 4M12 3v8m0 0l-3.5 3.5M12 11l3.5 3.5"
              />
            </svg>
          </span>
          <span v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 8v2m0 0h-3m3 0h3"
              />
            </svg>
          </span>
        </button>
        <!-- Schedule Date Icon -->
        <button
          type="button"
          :title="scheduledDate ? 'Change Date' : 'Schedule Date'"
          @click="showDateInput = !showDateInput"
          class="p-0 m-0 border-none bg-transparent focus:outline-none text-gray-500 hover:text-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
        <input
          v-if="showDateInput"
          v-model="scheduledDate"
          type="date"
          class="rounded border px-2 py-1 ml-2"
          @blur="showDateInput = false"
          style="width: 130px"
        />
        <!-- Schedule Time Icon -->
        <button
          type="button"
          :title="scheduledTime ? 'Change Time' : 'Schedule Time'"
          @click="showTimeInput = !showTimeInput"
          class="p-0 m-0 border-none bg-transparent focus:outline-none text-gray-500 hover:text-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <input
          v-if="showTimeInput"
          v-model="scheduledTime"
          type="time"
          class="rounded border px-2 py-1 ml-2"
          @blur="showTimeInput = false"
          style="width: 100px"
        />
      </div>
    </div>
    <!-- Interview Phase Name and Status Tag -->
    <div class="flex items-center justify-between mb-4 mt-8">
      <div class="flex items-center gap-2">
        <span class="text-lg font-bold">
          {{ interviewPhases[currentStageIndex]?.label }}
        </span>
        <span
          :class="[
            'inline-block px-4 py-1 rounded-2xl text-xs font-bold border',
            stage === 'Not Started'
              ? 'bg-gray-100 border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500'
              : '',
            stage === 'In Progress'
              ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-500'
              : '',
            stage === 'Done'
              ? 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900 dark:text-green-200 dark:border-green-500'
              : '',
          ]"
        >
          {{
            stage === "Not Started"
              ? "Not Planned"
              : stage === "In Progress"
              ? "In Progress"
              : stage === "Done"
              ? "Done"
              : ""
          }}
        </span>
      </div>
    </div>

    <!-- Stepper UI -->
    <div class="flex items-center justify-center mb-6">
      <div v-for="(s, i) in stages" :key="s" class="flex items-center">
        <div
          :class="[
            'w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold',
            i < currentStageIndex
              ? 'bg-green-500 border-green-500 text-white'
              : '',
            i === currentStageIndex
              ? 'bg-blue-600 border-blue-600 text-white animate-pulse'
              : '',
            i > currentStageIndex
              ? 'bg-gray-200 border-gray-300 text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400'
              : '',
          ]"
        >
          {{ i + 1 }}
        </div>
        <div
          v-if="i < stages.length - 1"
          class="w-8 h-1 bg-gray-300 dark:bg-gray-600 mx-1 rounded"
        ></div>
      </div>
    </div>
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
import { ref, computed } from "vue";
const interviewPhases = [
  { label: "Behavior Interview", value: "behavior" },
  { label: "Technical Interview", value: "technical" },
  { label: "Final Interview", value: "final" },
];
const stages = interviewPhases.map((p) => p.label);
const props = defineProps<{
  summary: Array<{ role: string; content: string }>;
}>();

// State for selected phase and scheduling
const selectedPhase = ref("behavior");
const scheduledDate = ref("");
const scheduledTime = ref("");
const showDateInput = ref(false);
const showTimeInput = ref(false);

const currentStageIndex = computed(() => {
  return interviewPhases.findIndex((p) => p.value === selectedPhase.value);
});

const stage = computed(() => stages[currentStageIndex.value]);
</script>
