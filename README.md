# LinkedIn Writing Assistant - AI-Powered Content Optimizer for LinkedIn Creators

LinkedIn Writing Assistant is an AI-powered tool designed specifically for LinkedIn content creators, consultants, and professionals. It provides LinkedIn-optimized writing suggestions, hook optimization, and engagement predictions to help create compelling LinkedIn posts that drive meaningful professional connections.

## Features Implemented

### ✅ Task 1: Authentication & Setup
- Next.js 15 with TypeScript and Tailwind CSS
- Supabase authentication (Magic Links + Google OAuth)
- Role-based access control (Owner/Editor roles)
- Protected routes and onboarding flow

### ✅ Task 2: Landing Page & Onboarding
- Professional landing page with hero, features, and pricing sections
- Onboarding flow for brand voice setup
- User profiles with brand personality configuration

### ✅ Task 3: Dashboard
- Collapsible sidebar navigation
- Draft cards with optimization scores
- Filtering and sorting functionality
- New draft creation

### ✅ Task 4: Editor Core
- Monospace editor with auto-save (every 30 seconds)
- Undo/redo functionality (50-action history)
- Daily snapshots
- Collapsible right sidebar with tabs

### ✅ Task 5: LinkedIn Writing Optimization
- GPT-4o integration via Supabase Edge Functions
- Real-time LinkedIn-specific content analysis
- Inline highlighting for LinkedIn best practices
- Hook effectiveness scoring
- Hashtag and mention suggestions
- LinkedIn engagement score

## Getting Started

### Prerequisites
- Node.js 18+ 
- Supabase account
- OpenAI API key (for text analysis features)

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Set up the database:
Run the SQL migrations in your Supabase SQL editor (found in `/supabase/migrations/`)

4. Deploy Edge Functions:
Follow the instructions in `/docs/setup-openai.md` to deploy the text analysis function

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
/app              # Next.js app directory
/components       # React components
  /auth          # Authentication components
  /dashboard     # Dashboard components
  /editor        # Editor components
  /landing       # Landing page components
  /ui            # shadcn/ui components
/lib             # Utility functions and stores
  /stores        # Zustand state management
  /supabase      # Supabase client configuration
/supabase        # Supabase configuration
  /functions     # Edge functions
  /migrations    # Database migrations
/public          # Static assets
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **AI**: OpenAI GPT-4o
- **Deployment**: Vercel (recommended)

## Development

### Running Tests
```bash
npm test
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project to Vercel
3. Add environment variables
4. Deploy

Remember to also deploy your Supabase Edge Functions in production.

## License

This project is licensed under the MIT License.