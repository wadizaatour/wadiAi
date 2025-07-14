import { ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useRuntimeConfig } from "nuxt/app";

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
    if (suggestionStep.value === 0) return [orderedSuggestions[0]];
    return orderedSuggestions.slice(
      suggestionStep.value,
      suggestionStep.value + 2
    );
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

  // Recruiter question patterns
  const recruiterQuestions = [
    /salary|compensation|pay|expect/i,
    /what.*salary/i,
    /tell.*about.*yourself/i,
    /who.*are.*you/i,
    /describe.*yourself/i,
    /experience|background/i,
    /skills|technologies|stack/i,
    /why.*cowmanager|why.*company/i,
    /strength|weakness/i,
    /hobby|free time|outside work/i,
    /why.*leave|left.*job/i,
    /where.*see.*yourself/i,
    /relocate|remote|onsite/i,
    /team|collaborate|work with/i,
    /challenge|problem/i,
    /project|proud/i,
    /education|degree|school/i,
    /questions.*for.*us/i,
  ];

  function getAIResponse(userText: string): string {
    // Detect nonsensical or random input
    const nonsensePatterns = [
      /^(?:[a-zA-Z]{1,2}\s*){5,}$/i, // many single/double letters
      /^(?:[0-9\W_]+)$/i, // only symbols or numbers
      /^\s*$/, // empty or whitespace
      /^(?:[a-zA-Z0-9]{1,3}\s*){8,}$/i, // many short tokens
      /^(?:[a-zA-Z]+\s*){1,2}$/i, // just one or two words (not a question)
      /lorem|asdf|qwer|zxcv|test|random|gibberish|blah|foo|bar|baz/i,
    ];
    const unclearResponses = [
      "I'm not sure I understand your question. Could you please rephrase or ask a more specific question?",
      "Sorry, I didn't quite get that. Can you clarify or provide more details?",
      "That doesn't seem like a question I can answer. Could you try rewording it?",
      "I couldn't understand your request. Please ask a clear or relevant question.",
      "Can you please provide more context or ask your question differently?",
    ];
    if (nonsensePatterns.some((pat) => pat.test(userText.trim()))) {
      return unclearResponses[
        Math.floor(Math.random() * unclearResponses.length)
      ];
    }
    // If not a question or too short
    if (!/[\?]/.test(userText) && userText.trim().split(/\s+/).length < 3) {
      return unclearResponses[
        Math.floor(Math.random() * unclearResponses.length)
      ];
    }
    if (
      recruiterQuestions[0].test(userText) ||
      /salary|compensation|pay|expect/i.test(userText)
    ) {
      return "We can talk about it in a private conversation.";
    }
    if (
      /tell.*about.*yourself|who.*are.*you|describe.*yourself/i.test(userText)
    ) {
      return "I'm Wadi, a Senior Frontend Engineer with extensive experience in React, Vue, and Typescript. I've delivered world-class user experiences to millions and thrive on building modern, responsive, and secure web applications.";
    }
    if (/experience|background/i.test(userText)) {
      return "I have worked as a Senior Frontend Engineer at CowManager since 2019, and previously as a FullStack Engineer at FactorBlue, Esprit, and Sofrecom, contributing to both frontend and backend projects.";
    }
    if (/skills|technologies|stack/i.test(userText)) {
      return "My main skills are React, Vue, Typescript, Javascript, HTML5, CSS, and Python. I'm also experienced with Node.js, Figma, AdobeXD, and Azure DevOps.";
    }
    if (/why.*cowmanager|why.*company/i.test(userText)) {
      return "I'm passionate about building impactful products and CowManager's mission aligns with my values. I enjoy working on innovative solutions in a collaborative environment.";
    }
    if (/strength/i.test(userText)) {
      return "My strengths are attention to detail, clear communication, and staying up-to-date with the latest frontend trends.";
    }
    if (/weakness/i.test(userText)) {
      return "I sometimes get too focused on perfecting UI details, but I've learned to balance quality with delivery timelines.";
    }
    if (/hobby|free time|outside work/i.test(userText)) {
      return "I enjoy blogging, learning new technologies, and contributing to open source. Outside work, I like to travel and explore new cultures.";
    }
    if (/why.*new.*mission|why.*find.*new.*mission/i.test(userText)) {
      return "I'm looking for a new mission to grow, take on new challenges, and contribute to impactful projects with a great team.";
    }
    if (/where.*live/i.test(userText)) {
      return "I currently live in the EU.";
    }
    if (/how.*many.*languages|languages.*you.*speak/i.test(userText)) {
      return "I speak English, French, and Arabic.";
    }
    if (/sponsor|visa|work permit|require.*visa/i.test(userText)) {
      return "No, I do not require sponsorship or a visa as I am an EU citizen.";
    }
    // Default fallback
    return "I'm happy to answer any questions about my experience, skills, or background!";
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
      // Recruiter question detection
      const isRecruiterQ = recruiterQuestions.some((pat) => pat.test(userText));
      // If nonsense or recruiter question, use local response
      if (isNonsense || isRecruiterQ) {
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
            content = `Sorry, OpenRouter error: ${res.status} ${res.statusText}`;
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
