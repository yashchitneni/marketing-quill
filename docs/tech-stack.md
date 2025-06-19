# MarketingQuill Tech Stack Documentation

**Date**: June 18, 2025  
**Project**: MarketingQuill – AI Copy Copilot for SaaS Marketing Managers  
**Purpose**: Outlines technologies for development consistency.

## 1. Tech Stack
| Layer    | Choice                                                     |
|----------|------------------------------------------------------------|
| Frontend | Next.js 15 (React 18, TypeScript), Tailwind CSS, shadcn/ui, Zustand |
| Backend  | Supabase (Postgres, Realtime, Edge Functions)              |
| Auth     | Supabase Auth (magic-link, Google OAuth)                   |
| AI       | OpenAI GPT-4o via Edge Functions; cached in Postgres       |
| Hosting  | Vercel (frontend), Supabase (backend)                      |
| Version  | Git (GitHub)                                               |

## 2. Rationale
- **Next.js 15**: Framework built on React 18, offering server-side rendering, static generation, and file-based routing for SEO and performance. TypeScript ensures type safety.  
- **Tailwind CSS**: Utility-first styling for rapid, responsive design.  
- **shadcn/ui**: Accessible, customizable React components.  
- **Zustand**: Lightweight state management for React.  
- **Supabase**: Integrated auth, database, and real-time features.  
- **GPT-4o**: High-quality AI suggestions.  
- **Vercel**: Seamless deployment, optimized for Next.js.  