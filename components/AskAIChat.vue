<template>
  <div>
    <div
      class="border border-gray-300 rounded bg-white dark:bg-gray-800 flex flex-col-reverse flex-1 min-h-0 max-h-[70vh] overflow-y-auto p-4 relative"
      style="height: 60vh"
    >
      <template v-for="(msg, i) in [...messages].reverse()" :key="i">
        <div
          :class="
            msg.role === 'user'
              ? 'flex-row-reverse text-right'
              : 'flex-row text-left'
          "
          class="relative flex items-end mb-2"
        >
          <div
            v-if="msg.role === 'assistant'"
            class="w-20 h-20 mr-1 order-0 flex items-center"
          >
            <div
              :ref="(el) => setLottieRef(el, messages.length - 1 - i)"
              :id="`wadi-lottie-${messages.length - 1 - i}`"
              class="w-20 h-20"
            ></div>
          </div>
          <div
            :class="
              msg.role === 'user'
                ? 'inline-block bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-3 py-2 rounded-lg my-1'
                : 'inline-block bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg my-1 fade-in-up'
            "
            :style="
              msg.role === 'assistant'
                ? 'margin-left: 76px;'
                : 'margin-right: 0;'
            "
          >
            <span v-if="msg.role === 'user'">You: </span>
            <span v-else><b>Wadi:&nbsp;</b></span>
            <span
              v-if="
                msg.role === 'assistant' &&
                messages.length - 1 - i === messages.length - 1 &&
                loading
              "
              >{{ animatedContent }}</span
            >
            <span v-else>{{ msg.content }}</span>
            <slot name="after-message" :msg="msg" :i="i" />
          </div>
        </div>
      </template>
      <div
        v-if="loading"
        class="text-gray-400 italic absolute right-0 bottom-2 pr-5 pt-4 pointer-events-none"
      >
        Wadi is typing...
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";
import lottie from "lottie-web";
import wadiLottieData from "../assets/json/wadi-avatar.json";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const props = defineProps<{
  messages: Message[];
  loading: boolean;
  animatedContent: string;
}>();

const lottieRefs = ref<any[]>([]);
function setLottieRef(el: any, i: number) {
  if (el) lottieRefs.value[i] = el;
}

watch(
  () => props.messages.length,
  async () => {
    await nextTick();
    props.messages.forEach((msg, i) => {
      const message = msg as Message;
      if (message.role === "assistant" && lottieRefs.value[i]) {
        if (lottieRefs.value[i].__lottie) {
          lottieRefs.value[i].__lottie.destroy();
        }
        lottieRefs.value[i].__lottie = lottie.loadAnimation({
          container: lottieRefs.value[i],
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: wadiLottieData,
        });
      }
    });
  },
  { immediate: true }
);
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
