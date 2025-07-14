# Wadi Portfolio & AI Chat App

This is a Nuxt 3 portfolio and AI chat application for Wadi Zaatour. It features a modern dashboard, animated avatar, mock interview/chat AI, weather app, blog, and contact form, with persistent conversation history and dark mode support.

## Features

- **Animated 2D Avatar**: Fun, interactive avatar using Lottie animations.
- **AI Chat (Ask AI)**: Mock interview and Q&A with persistent conversation history (stored with Pinia & localStorage).
- **Dashboard**: View, filter, and manage all AI conversations, with read/unread status.
- **Weather App**: Simple weather information page.
- **Blog**: Static blog page.
- **Contact**: Multi-step contact form with scheduling.
- **Dark/Light Mode**: Toggleable, with full theme support.
- **Responsive Sidebar**: Mobile-friendly navigation.
- **PWA Ready**: Can be installed on mobile for a native-like experience.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install

```sh
npm install
# or
yarn install
```

### Development

```sh
npx nuxi dev --host
# or
npm run dev -- --host
```

- Access the app at `http://localhost:3000` or from your phone at `http://<your-computer-ip>:3000` (same Wi-Fi).

### Build for Production

```sh
npx nuxi build
npx nuxi preview
```

### Enable PWA (Optional)

1. Install PWA module:
   ```sh
   npm install @nuxtjs/pwa
   ```
2. Add `@nuxtjs/pwa` to `modules` in `nuxt.config.ts` and configure as needed.
3. Rebuild and access from your phone, then "Add to Home Screen" in Safari/Chrome for a native-like app.

## Project Structure

- `pages/` — Main app pages (ask-ai, dashboard, weather, blogs, contact)
- `components/` — UI components (avatar, stats, summaries)
- `stores/` — Pinia stores (conversation, country)
- `layouts/` — App layout and sidebar
- `assets/` — Styles and Lottie animation JSON
- `public/` — Static assets (logos, etc.)

## Author

Wadi Zaatour

---

Feel free to fork, modify, and use for your own portfolio or AI chat projects!
