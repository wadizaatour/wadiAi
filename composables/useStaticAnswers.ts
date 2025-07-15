export function useStaticAnswers() {
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

  // Patterns and responses for greetings
  const greetingPatterns = [
    /^(hi|hello|hey|good (morning|afternoon|evening))\b/i,
    /how are you( doing)?[\?\!\.]?$/i,
    /what's up[\?\!\.]?$/i,
    /how is it going[\?\!\.]?$/i,
    /how do you do[\?\!\.]?$/i,
  ];
  const greetingResponses = [
    "Hello! I'm Wadi, your AI assistant. How can I help you today? You can pick a question below if you like!",
    "Hi there! I'm here to assist you. Feel free to ask anything, or try one of the suggested questions below.",
    "Hey! How can I assist you? You can use the suggestions for inspiration.",
    "Hello! I'm doing great, thank you. How can I help you today? You can also use the pre-set questions below.",
    "Hi! I'm here to help. You can ask me anything, or select a question from the suggestions!",
    "I'm doing well, thank you! How can I assist you? Try one of the questions below if you like.",
  ];

  // Patterns and responses for outros
  const outroPatterns = [
    /thank(s| you)[\.\!\s]*$/i,
    /bye[\.\!\s]*$/i,
    /goodbye[\.\!\s]*$/i,
    /see you( later)?[\.\!\s]*$/i,
    /take care[\.\!\s]*$/i,
    /have a (nice|great|good) (day|evening|weekend)[\.\!\s]*$/i,
    /appreciate (it|your help)[\.\!\s]*$/i,
    /cheers[\.\!\s]*$/i,
    /farewell[\.\!\s]*$/i,
  ];
  const outroResponses = [
    "You're very welcome! If you have more questions, just ask. Have a wonderful day!",
    "Glad I could help! Feel free to return anytime. Goodbye!",
    "Thank you for the chat! If you need anything else, I'm here.",
    "Take care! Wishing you a great day ahead.",
    "It was a pleasure assisting you. See you next time!",
    "Goodbye! Don't hesitate to reach out again if you need help.",
  ];

  // Patterns for nonsense/unclear input
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

  // Main static answer logic
  function getStaticAnswer(userText: string): string | null {
    if (greetingPatterns.some((pat) => pat.test(userText.trim()))) {
      return greetingResponses[
        Math.floor(Math.random() * greetingResponses.length)
      ];
    }
    if (outroPatterns.some((pat) => pat.test(userText.trim()))) {
      return outroResponses[Math.floor(Math.random() * outroResponses.length)];
    }
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
    return null;
  }

  return {
    recruiterQuestions,
    getStaticAnswer,
  };
}
