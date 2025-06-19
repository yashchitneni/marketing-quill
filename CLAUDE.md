# Claude AI Assistant Instructions

## Task Management Protocol

When working on this project, I should:

### 1. Session Start
- Run `npm run task:health` to check task status
- Run `npm run task:current` to see what's in progress
- Ask user which task to work on or suggest highest priority

### 2. During Development
- Update task status when starting: `npm run task:status [id] "in progress"`
- Create bug tasks immediately: `npm run task:bug "title" "description"`
- Update subtask completion in the task-master system
- If blocked, update status and document the blocker

### 3. Session End
- Update all task statuses based on work completed
- Run `npm run task:sync` to reprioritize
- Document any TODOs as new tasks

### 4. Bug Handling
When a bug is found:
1. Stop current work
2. Create bug task: `npm run task:bug "Bug: [description]" "[details]"`
3. Run `npm run task:sync` to reprioritize
4. Fix bug if critical, otherwise continue with current task

### 5. Task Selection Logic
Priority order:
1. Critical bugs (score > 90)
2. Security issues 
3. Blocked tasks that are now unblocked
4. High priority tasks with met dependencies
5. Medium priority tasks
6. Low priority tasks

## Current Project Status

### Completed Tasks:
- ✅ Task 1: Authentication
- ✅ Task 2: Landing Page
- ✅ Task 3: Dashboard
- ✅ Task 4: Editor Core
- ✅ Task 5: Grammar/Tone Suggestions

### High Priority Pending:
- Task 13: Security Implementation
- Task 15: Deployment Pipeline

### Ready to Start (dependencies met):
- Task 6: Subject-Line Optimizer
- Task 7: SEO Hint Panel
- Task 8: Export Functionality
- Task 10: Accessibility

## Quick Commands

```bash
# Task management
npm run task:list          # All tasks
npm run task:current       # In progress tasks
npm run task:sync         # Reprioritize
npm run task:health       # Health check

# Quick updates
npm run task:status 6 "in progress"
npm run task:bug "Title" "Description"

# Development
npm run dev               # Start dev server
npm run build            # Build project
npm run lint             # Run linter
```

## Important Context

1. **Supabase Edge Functions**: Need OpenAI API key set as secret
2. **Database**: Migrations in `/supabase/migrations/`
3. **Authentication**: Using Supabase Auth with magic links + Google OAuth
4. **State Management**: Zustand stores in `/lib/stores/`
5. **UI Components**: shadcn/ui in `/components/ui/`

## Known Issues
- Grammar suggestions need OpenAI API key in Supabase
- SEO analysis not yet implemented (Task 7)
- No export functionality yet (Task 8)

## Testing Checklist
Before marking a task as done:
- [ ] Feature works as specified
- [ ] No console errors
- [ ] TypeScript compiles without errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessibility basics (keyboard nav, ARIA labels)
- [ ] Updated relevant documentation