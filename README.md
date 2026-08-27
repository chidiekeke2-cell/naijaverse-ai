# NaijaVerse AI

**Turn your imagination into a playable world.**

NaijaVerse AI is a hackathon-focused interactive storytelling platform that transforms a story idea into a playable branching adventure, with African creativity at its core.

## Core loop

**Imagine → Generate → Remix → Play → Share**

## MVP

- AI-ready world generation architecture
- Structured, Zod-validated AI output
- Branching game engine
- Inventory and item requirements
- Multiple endings
- The Talking Drum demo set in Enugu
- Supabase persistence schema with RLS
- Demo-first architecture so the showcase can run without provider keys

## Stack

- Next.js + React + TypeScript
- Tailwind CSS
- Zod
- Supabase PostgreSQL
- OpenAI-compatible server-side AI adapter

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

## Environment

See `.env.example`. Never commit real secrets. AI keys must remain server-side.

## Supabase

Run `supabase/schema.sql` in a Supabase SQL editor, then configure the public URL/key and server-side service role key in your environment. Enable Auth when account persistence is needed.

## Demo

The Talking Drum demo is designed to provide a reliable judge experience even when external AI services are unavailable. The production AI path can be enabled by adding the required provider key.

## Deployment

Deploy the Next.js application to Vercel, configure the same environment variables in the project settings, and run `npm run build` before submitting.

## Product vision

NaijaVerse aims to become an AI engine for African interactive storytelling: creators describe an idea and turn it into stories, games, audio experiences and shareable worlds without needing a full production team.

## License

MIT
