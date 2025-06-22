# Claude AI Assistant Instructions - LinkedIn Writing Assistant

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

## Current Project Status - LinkedIn Writing Assistant

### Completed Tasks:
- ✅ Task 1: Authentication
- ✅ Task 2: Landing Page (needs LinkedIn messaging update)
- ✅ Task 3: Dashboard
- ✅ Task 4: Editor Core
- ✅ Task 5: LinkedIn Writing Optimization (formerly Grammar/Tone)

### High Priority Pending:
- Task 6: LinkedIn Hook Optimizer (formerly Subject-Line)
- Task 7: LinkedIn Optimization Panel (formerly SEO)
- Task 19: Real-time document saving

### Ready to Start (dependencies met):
- Task 6: LinkedIn Hook Optimizer
- Task 7: LinkedIn Optimization Panel
- Task 8: LinkedIn Export Functionality
- Task 10: Accessibility
- Task 23: Auto-draft hook generation

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

1. **LinkedIn Focus**: All features should be optimized for LinkedIn content creation
2. **Supabase Edge Functions**: Need OpenAI API key set as secret
3. **Database**: Migrations in `/supabase/migrations/`
4. **Authentication**: Using Supabase Auth with magic links + Google OAuth
5. **State Management**: Zustand stores in `/lib/stores/`
6. **UI Components**: shadcn/ui in `/components/ui/`
7. **Character Limits**: LinkedIn posts have 3000 char limit, optimal is ~1300

## Known Issues
- LinkedIn optimization suggestions need OpenAI API key in Supabase
- LinkedIn Optimization Panel not yet implemented (Task 7)
- No LinkedIn export functionality yet (Task 8)
- Hook optimizer not implemented (Task 6)

## Testing Checklist
Before marking a task as done:
- [ ] Feature works as specified
- [ ] No console errors
- [ ] TypeScript compiles without errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessibility basics (keyboard nav, ARIA labels)
- [ ] Updated relevant documentation