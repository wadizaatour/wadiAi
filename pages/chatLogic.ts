import { ref, watch, nextTick } from "vue";
import lottie from "lottie-web";
import wadiLottieData from "../assets/json/wadi-avatar.json";

export const input = ref("");
export const loading = ref(false);
export const puterReady = ref(false);
export const messages = ref([
  {
    role: "system",
    content: `You are a helpful AI assistant that represents the user (a Senior Frontend Engineer named Wadi zaatour). You do mock interviews with recruiters and answer their questions as if you were Wadi. Be professional, concise, and friendly.`,
  },
]);

export const lottieRefs = ref<any[]>([]);
export function setLottieRef(el: any, i: number) {
  if (el) lottieRefs.value[i] = el;
}

export const recruiterQuestions = [
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

export function getAIResponse(userText: string): string {
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

export const orderedSuggestions = [
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

export const suggestionStep = ref(0);

export function getCurrentSuggestions() {
  if (suggestionStep.value === 0) return [orderedSuggestions[0]];
  // Show next 2 questions in order, but never repeat
  return orderedSuggestions.slice(
    suggestionStep.value,
    suggestionStep.value + 2
  );
}

export function selectSuggestion(
  s: string,
  loading: any,
  input: any,
  sendMessage: any
) {
  if (loading.value) return;
  input.value = s;
  sendMessage();
}

export const animatedContent = ref("");

export async function typeTextEffect(text: string) {
  animatedContent.value = "";
  for (let i = 0; i <= text.length; i++) {
    animatedContent.value = text.slice(0, i);
    await new Promise((resolve) => setTimeout(resolve, 12)); // Faster typing
  }
}

export const ttsEnabled = ref(true);

export function speak(text: string) {
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

export const sendMessage = async () => {
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

export function setupLottieWatcher() {
  watch(
    () => messages.value.length,
    async () => {
      await nextTick();
      messages.value.forEach((msg, i) => {
        if (msg.role === "assistant" && lottieRefs.value[i]) {
          // Destroy previous instance if exists
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
}
