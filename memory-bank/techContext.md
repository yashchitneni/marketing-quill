# MarketingQuill Technical Context

## Technology Stack

### Frontend Technologies
- **Framework**: Next.js 15 with React 18
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first design
- **UI Components**: shadcn/ui for accessible, customizable components
- **State Management**: Zustand for lightweight state management
- **Font**: JetBrains Mono (editor), Inter (UI)

### Backend Technologies
- **Platform**: Supabase (PostgreSQL, Realtime, Edge Functions)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Authentication**: Supabase Auth (magic-link, Google OAuth)
- **Real-time**: Supabase Realtime for live updates
- **API**: Supabase Edge Functions for serverless compute

### AI & External Services
- **AI Model**: OpenAI GPT-4o for content analysis and suggestions
- **Integration**: GPT-4o accessed via Supabase Edge Functions
- **Caching**: PostgreSQL for suggestion caching to reduce costs
- **Performance**: Streaming completions for real-time responses

### Development Tools
- **Version Control**: Git with GitHub
- **Deployment**: Vercel for frontend, Supabase for backend
- **Package Manager**: npm/yarn
- **Code Quality**: ESLint, Prettier, TypeScript compiler

## Development Setup

### Environment Requirements
- Node.js 18+ 
- npm or yarn package manager
- Git for version control
- Supabase CLI for local development
- Vercel CLI for deployment

### Key Dependencies
```json
{
  "next": "^15.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0",
  "zustand": "^4.0.0",
  "@supabase/supabase-js": "^2.0.0"
}
```

### Configuration Files
- `next.config.js`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS customization
- `tsconfig.json`: TypeScript configuration
- `supabase/config.toml`: Supabase local configuration
- `.env.local`: Environment variables (API keys, URLs)

## Technical Constraints

### Performance Requirements
- **Suggestion Latency**: <2 seconds for AI responses
- **Uptime**: 99.9% availability target
- **Concurrent Users**: Support 100 free-tier users simultaneously
- **Auto-save**: 30-second intervals without blocking UI

### Browser Support
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- JavaScript enabled (no graceful degradation for core functionality)
- Local storage for offline draft caching

### API Rate Limits
- OpenAI GPT-4o: Cost management through caching
- Supabase: Free tier limits for database operations
- Google OAuth: Standard OAuth rate limits

## Architecture Decisions

### Why Next.js 15?
- Server-side rendering for SEO and performance
- File-based routing for intuitive navigation
- Built-in optimization for images and fonts
- Excellent TypeScript integration
- Vercel deployment optimization

### Why Supabase?
- Integrated auth, database, and real-time features
- PostgreSQL for complex queries and relationships
- Edge Functions for serverless AI processing
- Real-time subscriptions for collaborative features
- Row Level Security for data isolation

### Why Zustand?
- Lightweight alternative to Redux
- Simple API with minimal boilerplate
- TypeScript-first design
- No providers needed
- Easy to test and debug

### Why Tailwind CSS?
- Utility-first approach for rapid development
- Consistent design system
- Excellent performance (purged unused styles)
- Great developer experience with IntelliSense
- shadcn/ui compatibility

## Development Patterns

### File Structure
```
marketing-quill/
├── app/                    # Next.js app router
├── components/             # Reusable UI components
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
├── types/                 # TypeScript type definitions
├── supabase/              # Database migrations and functions
└── public/                # Static assets
```

### Component Organization
- **Atomic Design**: Atoms, molecules, organisms pattern
- **Feature-based**: Group related components by functionality
- **Shared Components**: Reusable UI elements in components/ui/
- **Page Components**: Route-specific components in app/

### State Management Patterns
- **Global State**: User auth, app settings via Zustand
- **Local State**: Component-specific state via React hooks
- **Server State**: Supabase queries with built-in caching
- **Form State**: React Hook Form for complex forms

### Styling Conventions
- **Utility Classes**: Tailwind for most styling needs
- **Component Variants**: shadcn/ui variant patterns
- **Responsive Design**: Mobile-first with Tailwind breakpoints
- **Dark Mode**: CSS variables for theme switching

## Integration Points

### Supabase Integration
- **Database**: PostgreSQL with typed queries
- **Auth**: Seamless authentication flow
- **Real-time**: Live collaboration features
- **Edge Functions**: AI processing and business logic

### OpenAI Integration
- **API Calls**: Via Supabase Edge Functions for security
- **Streaming**: Real-time suggestion delivery
- **Error Handling**: Graceful fallbacks for API failures
- **Cost Management**: Caching and rate limiting

### Vercel Deployment
- **Automatic Deployment**: Git-based deployment pipeline
- **Environment Variables**: Secure configuration management
- **Performance Monitoring**: Built-in analytics and monitoring
- **Edge Functions**: Global distribution for low latency

## Security Considerations

### Data Protection
- **TLS Encryption**: All data in transit
- **Row Level Security**: Database-level access control
- **Input Sanitization**: Prevent injection attacks
- **GDPR Compliance**: Data export and deletion capabilities

### Authentication Security
- **JWT Tokens**: Secure session management
- **OAuth Scopes**: Minimal required permissions
- **Session Expiry**: Automatic token refresh
- **Rate Limiting**: Prevent abuse and attacks 