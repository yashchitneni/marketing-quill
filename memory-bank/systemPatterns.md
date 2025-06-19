# MarketingQuill System Patterns

## Architecture Overview

### Three-Tier Architecture
1. **Frontend**: Next.js 15 with React 18 and TypeScript
2. **Backend**: Supabase (Postgres, Realtime, Edge Functions)
3. **AI Layer**: OpenAI GPT-4o via Supabase Edge Functions

### Key Design Patterns

#### Frontend Patterns
- **Component Architecture**: shadcn/ui components with Tailwind CSS styling
- **State Management**: Zustand for lightweight, predictable state
- **Layout Pattern**: Three-pane editor interface (Left Sidebar | Content Area | Right Sidebar)
- **Real-time Updates**: Supabase Realtime for live collaboration features
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

#### Backend Patterns
- **Database**: PostgreSQL with Supabase for structured data and real-time capabilities
- **Authentication**: Supabase Auth with magic-link and Google OAuth
- **API Layer**: Supabase Edge Functions for AI processing and business logic
- **Caching Strategy**: Postgres-based caching for AI suggestions to reduce costs
- **Security**: Row Level Security (RLS) for data isolation

#### AI Integration Patterns
- **Streaming Responses**: Real-time suggestion delivery as user types
- **Context Awareness**: Maintain writing context for relevant suggestions
- **Suggestion Caching**: Store and reuse similar suggestions to optimize performance
- **Fallback Handling**: Graceful degradation when AI services are unavailable

## Component Relationships

### Editor Interface Structure
```
App Shell
├── Top Bar (workspace switch, New Draft button)
├── Left Sidebar (collapsible navigation)
│   ├── Logo
│   ├── Drafts Icon
│   ├── New Draft Icon
│   ├── Settings Icon
│   └── Profile Icon
├── Content Area (main editor)
│   ├── Editor Pane (JetBrains Mono, inline suggestions)
│   └── Sticky Footer (word count, SEO score, export)
└── Right Sidebar (suggestion tools)
    ├── Tab Navigation (Grammar | Tone | SEO)
    └── Suggestion Cards (scrollable list)
```

### Data Flow Patterns
1. **User Input** → Editor Component
2. **Content Change** → Debounced AI Analysis (500ms delay)
3. **AI Response** → Suggestion Store (Zustand)
4. **Suggestion Rendering** → Inline Underlines + Sidebar Cards
5. **User Action** → Accept/Reject → Content Update + Analytics

### State Management Structure
```typescript
interface EditorState {
  content: string
  suggestions: Suggestion[]
  activeTab: 'grammar' | 'tone' | 'seo'
  isLoading: boolean
  undoStack: ContentSnapshot[]
  autoSaveStatus: 'saved' | 'saving' | 'error'
}
```

## Critical Implementation Paths

### Real-time Suggestion Pipeline
1. **Input Debouncing**: 500ms delay after user stops typing
2. **Content Analysis**: Send to GPT-4o via Edge Function
3. **Response Processing**: Parse and categorize suggestions
4. **UI Updates**: Render inline underlines and sidebar cards
5. **Performance Monitoring**: Track latency and success rates

### Auto-save Mechanism
1. **Change Detection**: Monitor content modifications
2. **Debounced Save**: 30-second intervals or on significant changes
3. **Optimistic UI**: Show "saving" status immediately
4. **Error Handling**: Retry logic with user notification
5. **Version Tracking**: Maintain undo stack and daily snapshots

### Export System
1. **Format Selection**: HTML email, Markdown, or share link
2. **Content Processing**: Apply formatting and cleanup
3. **Output Generation**: Create downloadable files or clipboard content
4. **Analytics Tracking**: Monitor export usage patterns

## Security & Performance Patterns

### Authentication Flow
1. **Magic Link**: Email-based passwordless authentication
2. **OAuth Integration**: Google sign-in with Supabase Auth
3. **Session Management**: JWT tokens with automatic refresh
4. **Role-based Access**: Owner/Editor permissions

### Performance Optimization
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Next.js automatic optimization
- **Caching Strategy**: Browser caching + Supabase query caching
- **Bundle Analysis**: Regular monitoring of bundle size

### Error Handling Patterns
- **Graceful Degradation**: Continue functioning without AI suggestions
- **User Feedback**: Clear error messages and recovery options
- **Logging**: Comprehensive error tracking for debugging
- **Retry Logic**: Automatic retries for transient failures

## Scalability Considerations

### Current Constraints
- 100 concurrent free-tier users
- <2s suggestion latency requirement
- 99.9% uptime target

### Growth Patterns
- **Database Scaling**: Postgres read replicas for query performance
- **AI Cost Management**: Suggestion caching and rate limiting
- **CDN Integration**: Static asset delivery optimization
- **Monitoring**: Performance metrics and alerting systems 