import { ref, onMounted, onUnmounted, watch } from "vue";

export function useMobileDetection(threshold = 768) {
  const isMobile = ref(false);
  const loading = ref(false);

  function checkIsMobile() {
    isMobile.value =
      typeof window !== "undefined" && window.innerWidth <= threshold;
  }

  function triggerLoading() {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 600);
  }

  onMounted(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    if (isMobile.value) {
      triggerLoading();
    }
  });
  onUnmounted(() => {
    window.removeEventListener("resize", checkIsMobile);
  });

  watch(isMobile, (val) => {
    if (val) {
      triggerLoading();
    }
  });

  return { isMobile, loading };
}
