import { defineEventHandler, readBody } from "h3";

// This uses the OpenRouter API endpoint and your provided key.
const OPENROUTER_API_KEY =
  "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";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { messages } = body;

  if (!OPENROUTER_API_KEY) {
    return { error: "No OpenRouter API key provided." };
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      // Optionally add your site info for OpenRouter rankings:
      // 'HTTP-Referer': 'https://your-site-url.com',
      // 'X-Title': 'Your Site Name',
    },
    body: JSON.stringify({
      model: "openai/gpt-4o",
      messages,
    }),
  });

  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    // Log error details for debugging
    console.error("OpenRouter API error:", data || (await response.text()));
    return { error: data?.error || "Failed to fetch from OpenRouter." };
  }

  return data;
});
