<template>
  <section class="max-w-4xl mx-auto p-6 space-y-6">
    <script lang="ts" setup>
      import { onMounted } from "vue";
      import {
        input,
        loading,
        puterReady,
        messages,
        lottieRefs,
        setLottieRef,
        getCurrentSuggestions,
        selectSuggestion,
        ttsEnabled,
        animatedContent,
        sendMessage,
        setupLottieWatcher
      } from "./chatLogic";

      onMounted(() => {
        setupLottieWatcher();
        if (window["puter"] && window["puter"].ai) {
          puterReady.value = true;
          return;
        }
        const existing = document.querySelector(
          'script[src="https://js.puter.com/v2/"]'
        );
        if (existing) {
          existing.addEventListener("load", () => {
            puterReady.value = true;
          });
          // If already loaded
          if (window["puter"] && window["puter"].ai) puterReady.value = true;
          return;
        }
        const script = document.createElement("script");
        script.src = "https://js.puter.com/v2/";
        script.async = true;
        script.onload = () => {
          puterReady.value = true;
        };
        document.head.appendChild(script);
      });
      ];

      const suggestionStep = ref(0);

      function getCurrentSuggestions() {
        if (suggestionStep.value === 0) return [orderedSuggestions[0]];
        // Show next 2 questions in order, but never repeat
        return orderedSuggestions.slice(
          suggestionStep.value,
          suggestionStep.value + 2
        );
      }

      function selectSuggestion(s: string) {
        if (loading.value) return;
        input.value = s;
        sendMessage();
      }

      const animatedContent = ref("");

      async function typeTextEffect(text: string) {
        animatedContent.value = "";
        for (let i = 0; i <= text.length; i++) {
          animatedContent.value = text.slice(0, i);
          await new Promise((resolve) => setTimeout(resolve, 12)); // Faster typing
        }
      }

      const ttsEnabled = ref(true);

      function speak(text: string) {
        if (!ttsEnabled.value) return;
        if ("speechSynthesis" in window) {
          const synth = window.speechSynthesis;
          let selectedVoice: SpeechSynthesisVoice | null = null;
          const voices = synth.getVoices();
          selectedVoice =
            voices.find(
              (v) =>
                v.lang.startsWith("en") &&
                /Google|Microsoft|Apple|Natural|Jenny|Aria|Emma|Samantha|Karen|Daniel|Susan|Zira|Hazel/i.test(
                  v.name
                )
            ) ||
            voices.find((v) => v.lang.startsWith("en")) ||
            null;

          const utter = new window.SpeechSynthesisUtterance(text);
          if (selectedVoice) {
            utter.voice = selectedVoice;
            utter.lang = selectedVoice.lang;
          } else {
            utter.lang = "en-US";
          }
          utter.rate = 1;
          utter.pitch = 1.05;
          synth.cancel(); // Stop any previous speech
          synth.speak(utter);
        }
      }

      const sendMessage = async () => {
        if (!input.value.trim()) return;
        messages.value.push({ role: "user", content: input.value });
        loading.value = true;
        try {
          const userText = input.value;
          let content = getAIResponse(userText);
          if (
            content ===
            "I'm happy to answer any questions about my experience, skills, or background!"
          ) {
            content = "When we schedule a call we can talk about this.";
          }
          await typeTextEffect(content);
          messages.value.push({ role: "assistant", content: animatedContent.value });
          speak(animatedContent.value); // Speak the answer
          animatedContent.value = "";
          if (suggestionStep.value < orderedSuggestions.length - 1) {
            suggestionStep.value++;
          }
        } catch (error) {
          console.error("Error:", error);
          loading.value = false;
        }
        loading.value = false;
      };
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
  </section>
</template>
