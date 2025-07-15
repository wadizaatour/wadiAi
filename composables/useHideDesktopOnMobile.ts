import { ref, watch } from "vue";
import { useMobileDetection } from "./useMobileDetection";

/**
 * Watches for desktop-to-mobile transitions and hides the desktop layout/content when switching to mobile.
 * Returns a ref `hideDesktop` that is true when desktop layout should be hidden.
 */
export function useHideDesktopOnMobile() {
  const { isMobile } = useMobileDetection();
  const hideDesktop = ref(isMobile.value);
  let prevIsMobile = isMobile.value;

  watch(isMobile, (newVal, oldVal) => {
    if (oldVal === false && newVal === true) {
      // Switched from desktop to mobile
      hideDesktop.value = true;
    } else if (oldVal === true && newVal === false) {
      // Switched from mobile to desktop
      hideDesktop.value = false;
    }
    prevIsMobile = newVal;
  });

  return { hideDesktop };
}
