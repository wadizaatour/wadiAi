import { defineEventHandler, readBody } from "h3";

// This uses the free OpenAI API endpoint for demonstration. Replace with your own key for production.
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ""; // You can set your own key in .env
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { messages } = body;

  if (!OPENAI_API_KEY) {
    return { error: "No OpenAI API key provided." };
  }

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  if (!response.ok) {
    return { error: "Failed to fetch from OpenAI." };
  }

  const data = await response.json();
  return data;
});
