<template>
  <section class="max-w-4xl mx-auto p-6 space-y-6">
    <h1 class="text-3xl font-bold mb-4">Contact</h1>
    <p class="mb-4 text-gray-700">
      Get in touch with me for collaboration or inquiries.
    </p>
    <div class="mb-6 flex justify-center gap-4">
      <div
        v-for="(step, idx) in steps"
        :key="idx"
        class="flex flex-col items-center"
      >
        <div
          :class="[
            'w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold mb-1',
            currentStep === idx + 1
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
              : 'bg-gray-100 text-gray-500 border-gray-300',
          ]"
        >
          {{ idx + 1 }}
        </div>
        <span
          :class="
            currentStep === idx + 1
              ? 'text-blue-600 font-semibold'
              : 'text-gray-500'
          "
          >{{ step }}</span
        >
      </div>
    </div>
    <form @submit.prevent="handleSubmit" class="space-y-6 max-w-lg mx-auto">
      <div v-if="currentStep === 1" class="space-y-4">
        <label class="block text-gray-700 font-medium"
          >Choose date and time</label
        >
        <input
          v-model="date"
          type="date"
          class="border border-gray-300 rounded px-3 py-2 w-full"
          required
        />
        <input
          v-model="time"
          type="time"
          class="border border-gray-300 rounded px-3 py-2 w-full"
          required
        />
        <button
          type="button"
          class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="nextStep"
          :disabled="!date || !time"
        >
          Next
        </button>
      </div>
      <div v-else-if="currentStep === 2" class="space-y-4">
        <label class="block text-gray-700 font-medium"
          >Live notes (optional)</label
        >
        <textarea
          v-model="notes"
          rows="4"
          class="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder="Add any notes for the call..."
        ></textarea>
        <div class="flex justify-between">
          <button
            type="button"
            class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            @click="prevStep"
          >
            Back
          </button>
          <button
            type="button"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            @click="nextStep"
          >
            Next
          </button>
        </div>
      </div>
      <div v-else-if="currentStep === 3" class="space-y-4">
        <div class="text-lg font-medium text-gray-700 mb-2">
          Review & Submit
        </div>
        <div
          class="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700"
        >
          <div><b>Date:</b> {{ date }}</div>
          <div><b>Time:</b> {{ time }}</div>
          <div v-if="notes"><b>Notes:</b> {{ notes }}</div>
        </div>
        <div class="flex justify-between">
          <button
            type="button"
            class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700"
            @click="prevStep"
          >
            Back
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Appointment
          </button>
        </div>
        <div v-if="submitted" class="mt-4 text-green-600 font-semibold">
          Appointment submitted! I will contact you soon.
        </div>
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const steps = ["Choose Date & Time", "Live Notes", "Submit Appointment"];
const currentStep = ref(1);
const date = ref("");
const time = ref("");
const notes = ref("");
const submitted = ref(false);

function nextStep() {
  if (currentStep.value < 3) currentStep.value++;
}
function prevStep() {
  if (currentStep.value > 1) currentStep.value--;
}
function handleSubmit() {
  submitted.value = true;
}
</script>

<style scoped>
.fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}
.step-indicator {
  transition: background 0.2s, color 0.2s;
}
</style>
