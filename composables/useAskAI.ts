import { ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useRuntimeConfig } from "nuxt/app";
import { useStaticAnswers } from "./useStaticAnswers";

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export function useAskAI() {
  const config = useRuntimeConfig();
  const input = ref("");
  const loading = ref(false);
  const puterReady = ref(false);
  const messages = ref<Message[]>([
    {
      role: "system",
      content: `You are a helpful AI assistant. Be professional, concise, and friendly and write 2 sentences answer.`,
    },
  ]);
  const animatedContent = ref("");
  const ttsEnabled = ref(true);
  const suggestionStep = ref(0);

  const orderedSuggestions = [
    "Tell me about yourself.",
    "Can you describe your experience?",
    "What are your main skills?",
    "What are your strengths?",
    "What are your weaknesses?",
    "What do you do in your free time?",
    "Why do you want to find a new mission?",
    "Where do you live?",
    "How many languages do you speak?",
    "Do you require sponsorship or a visa?",
    "Where do you see yourself in 5 years?",
    "Are you open to remote or onsite work?",
    "How do you collaborate with teams?",
    "Describe a challenge you solved.",
    "What project are you most proud of?",
    "What is your educational background?",
    "Do you have any questions for us?",
    "What are your salary expectations?",
  ];

  function getCurrentSuggestions() {
    // Collect all user questions already asked
    const asked = new Set(
      messages.value
        .filter((m) => m.role === "user")
        .map((m) => m.content.trim())
    );

    // Always include 'Tell me about yourself.' if not already asked
    const suggestions: string[] = [];
    if (!asked.has(orderedSuggestions[0])) {
      suggestions.push(orderedSuggestions[0]);
    }

    // Add the next available suggestion(s) that haven't been asked
    for (
      let i = 1;
      i < orderedSuggestions.length && suggestions.length < 2;
      i++
    ) {
      if (!asked.has(orderedSuggestions[i])) {
        suggestions.push(orderedSuggestions[i]);
      }
    }
    return suggestions;
  }

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
      synth.cancel();
      synth.speak(utter);
    }
  }

  function saveConversation() {
    if (messages.value.length > 1) {
      const stored = localStorage.getItem("wadi_conversations");
      let conversations = stored ? JSON.parse(stored) : [];
      const newConv = {
        date: new Date().toISOString(),
        messages: [...messages.value],
        read: false,
      };
      conversations.push(newConv);
      localStorage.setItem("wadi_conversations", JSON.stringify(conversations));
    }
  }

  function startNewChat() {
    if (messages.value.length > 1) {
      const stored = localStorage.getItem("wadi_conversations");
      const conversations = stored ? JSON.parse(stored) : [];
      conversations.push({
        date: new Date().toISOString(),
        messages: [...messages.value],
        read: false,
      });
      localStorage.setItem("wadi_conversations", JSON.stringify(conversations));
    }
    messages.value = [
      {
        role: "system",
        content:
          "You are a helpful AI assistant that represents the user (a Senior Frontend Engineer named Wadi zaatour). You do mock interviews with recruiters and answer their questions as if you were Wadi. Be professional, concise, and friendly.",
      },
    ];
    input.value = "";
    suggestionStep.value = 0;
  }

  async function typeTextEffect(text: string) {
    animatedContent.value = "";
    for (let i = 0; i <= text.length; i++) {
      animatedContent.value = text.slice(0, i);
      await new Promise((resolve) => setTimeout(resolve, 12));
    }
  }

  // Use static answers composable
  const { recruiterQuestions, getStaticAnswer } = useStaticAnswers();

  function getAIResponse(userText: string): string {
    // Use static/local answer logic, fallback to default if null
    return (
      getStaticAnswer(userText) ??
      "I'm happy to answer any questions about my experience, skills, or background!"
    );
  }

  // Main sendMessage logic
  const router = useRouter();
  async function sendMessage() {
    if (!input.value.trim()) return;
    messages.value.push({ role: "user", content: input.value });
    loading.value = true;
    try {
      const userText = input.value;
      // Nonsense/weird detection
      const nonsensePatterns = [
        /^(?:[a-zA-Z]{1,2}\s*){5,}$/i,
        /^(?:[0-9\W_]+)$/i,
        /^\s*$/,
        /^(?:[a-zA-Z0-9]{1,3}\s*){8,}$/i,
        /^(?:[a-zA-Z]+\s*){1,2}$/i,
        /lorem|asdf|qwer|zxcv|test|random|gibberish|blah|foo|bar|baz/i,
      ];
      const isNonsense = nonsensePatterns.some((pat) =>
        pat.test(userText.trim())
      );
      // Recruiter question detection and static answer logic
      const isRecruiterQ = recruiterQuestions.some((pat) => pat.test(userText));
      const staticAnswer = getStaticAnswer(userText);
      if (isNonsense || isRecruiterQ || staticAnswer) {
        let content = getAIResponse(userText);
        if (
          content ===
          "I'm happy to answer any questions about my experience, skills, or background!"
        ) {
          content = "When we schedule a call we can talk about this.";
        }
        if (typeof content !== "string" || !content.trim()) {
          content = "Sorry, I couldn't generate a response.";
        }
        await typeTextEffect(content);
        messages.value.push({
          role: "assistant",
          content: animatedContent.value,
        });
        speak(animatedContent.value);
        animatedContent.value = "";
        if (suggestionStep.value < orderedSuggestions.length - 1) {
          suggestionStep.value++;
        }
        saveConversation();
      } else {
        // Use OpenRouter API for other questions (direct integration)
        const OPENROUTER_API_KEY = config.public.openrouterApiKey;
        const OPENROUTER_API_URL =
          "https://openrouter.ai/api/v1/chat/completions";
        const systemPrompt = messages.value.find((m) => m.role === "system");
        const chatMessages = [
          ...(systemPrompt ? [systemPrompt] : []),
          ...messages.value.filter((m) => m.role !== "system"),
        ];
        let content = "";
        try {
          // Add fetch timeout (15s)
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000);
          const res = await fetch(OPENROUTER_API_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "deepseek/deepseek-r1-0528:free",
              messages: chatMessages,
            }),
            signal: controller.signal,
          });
          clearTimeout(timeout);
          if (!res.ok) {
            if (res.status === 401) {
              // Use static fallback logic for 401 Unauthorized
              content = "When we schedule a call we can talk about this.";
            } else {
              content = `Sorry, OpenRouter error: ${res.status} ${res.statusText}`;
            }
          } else {
            const data = await res.json();
            content =
              data.choices?.[0]?.message?.content?.trim() ||
              data.error ||
              "Sorry, I couldn't generate a response.";
          }
        } catch (e: any) {
          if (e.name === "AbortError") {
            content = "Sorry, the request timed out. Please try again.";
          } else {
            content = "Sorry, there was a problem generating a response.";
          }
        }
        if (typeof content !== "string" || !content.trim()) {
          content = "Sorry, I couldn't generate a response.";
        }
        await typeTextEffect(content);
        messages.value.push({
          role: "assistant",
          content: animatedContent.value,
        });
        speak(animatedContent.value);
        animatedContent.value = "";
        if (suggestionStep.value < orderedSuggestions.length - 1) {
          suggestionStep.value++;
        }
        saveConversation();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loading.value = false;
    }
  }

  return {
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
  };
}
