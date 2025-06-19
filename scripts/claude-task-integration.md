# Claude + Task-Master-AI Integration Guide

## Overview
This guide helps you integrate Claude with your task management system for automatic updates and smart prioritization.

## 1. Automated Task Synchronization

### Setup package.json scripts:
```json
{
  "scripts": {
    "task:sync": "node scripts/task-sync.js",
    "task:bug": "node scripts/task-sync.js bug",
    "task:status": "node scripts/task-sync.js status",
    "task:list": "npx task-master-ai list",
    "task:current": "npx task-master-ai list --status 'in progress'"
  }
}
```

### Usage:
```bash
# Reprioritize all tasks based on bugs/issues
npm run task:sync

# Quickly create a bug task
npm run task:bug "Login button not working" "Users can't login with Google OAuth"

# Update task status
npm run task:status 6 "in progress"

# View current tasks
npm run task:current
```

## 2. Claude Integration Workflow

### When Starting a Session with Claude:

1. **Tell Claude to check current status:**
   ```
   "Check the current task status using task-master-ai and tell me what's in progress and what's next priority"
   ```

2. **Ask Claude to update tasks as work progresses:**
   ```
   "After completing each subtask, update the task status in task-master-ai"
   ```

3. **Report bugs immediately:**
   ```
   "I found a bug: [describe bug]. Create a high-priority task for this and reprioritize the task list"
   ```

## 3. Automatic Priority Rules

The system automatically prioritizes based on:

1. **Bugs** (Priority Score: 100)
   - Any task with "bug" or "fix" in the title
   - Issues labeled as bugs in GitHub

2. **Security Issues** (Priority Score: 90)
   - Security vulnerabilities
   - Authentication/authorization issues

3. **Blocking Issues** (Priority Score: 80)
   - Tasks blocking other work
   - Dependencies for multiple tasks

4. **User-Reported** (Priority Score: 70)
   - Issues reported by users
   - Customer feedback items

5. **Features** (Priority Score: 50)
   - New functionality
   - Enhancements

## 4. Git Hooks for Automatic Updates

Create `.git/hooks/post-commit`:
```bash
#!/bin/bash
# Auto-sync tasks after each commit

# Check if commit message contains task reference
TASK_ID=$(git log -1 --pretty=%B | grep -oP 'task-\K\d+' || true)

if [ ! -z "$TASK_ID" ]; then
  # Update task status if mentioned in commit
  npx task-master-ai set-status $TASK_ID "in progress"
fi

# Run reprioritization
npm run task:sync
```

Make it executable:
```bash
chmod +x .git/hooks/post-commit
```

## 5. VS Code Integration

Create `.vscode/tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Sync Tasks",
      "type": "shell",
      "command": "npm run task:sync",
      "group": "none",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "Report Bug",
      "type": "shell",
      "command": "npm run task:bug \"${input:bugTitle}\" \"${input:bugDescription}\"",
      "group": "none"
    },
    {
      "label": "Update Task Status",
      "type": "shell", 
      "command": "npm run task:status ${input:taskId} \"${input:taskStatus}\"",
      "group": "none"
    }
  ],
  "inputs": [
    {
      "id": "bugTitle",
      "type": "promptString",
      "description": "Bug title"
    },
    {
      "id": "bugDescription",
      "type": "promptString",
      "description": "Bug description"
    },
    {
      "id": "taskId",
      "type": "promptString",
      "description": "Task ID"
    },
    {
      "id": "taskStatus",
      "type": "pickString",
      "description": "Task Status",
      "options": ["pending", "in progress", "done", "blocked"]
    }
  ]
}
```

Now you can use VS Code Command Palette (Cmd+Shift+P) > "Tasks: Run Task" to manage tasks.

## 6. Best Practices for Claude Sessions

### Starting a Session:
```
1. "Check current task status and active bugs"
2. "What's the highest priority pending task that's not blocked?"
3. "Update task X to 'in progress' and let's work on it"
```

### During Work:
```
1. "I completed the authentication part, update the subtask"
2. "Found a bug while testing: [description]. Add it as high priority"
3. "This is blocked by [reason], update status and move to next priority"
```

### Ending a Session:
```
1. "Update all task statuses based on what we completed"
2. "Create tasks for any TODOs we identified"
3. "Run task sync to reprioritize for next session"
```

## 7. GitHub Integration (Optional)

If using GitHub:
```bash
# Install GitHub CLI
brew install gh

# Authenticate
gh auth login

# Create issue and task together
gh issue create --title "Bug: Login fails" --label "bug" && \
npm run task:bug "Bug: Login fails" "Users cannot login - GitHub Issue #X"
```

## 8. Daily Workflow

1. **Morning:**
   ```bash
   npm run task:sync  # Reprioritize based on new issues
   npm run task:current  # See what's in progress
   ```

2. **During Development:**
   - Update task status as you work
   - Create bug tasks immediately when found
   - Ask Claude to check dependencies before starting new tasks

3. **End of Day:**
   ```bash
   npm run task:sync  # Final reprioritization
   git commit -m "feat: completed task-6 subject line optimizer"
   ```

## 9. Emergency Bug Response

When a critical bug appears:
```bash
# 1. Create high-priority bug task
npm run task:bug "CRITICAL: Payment system down" "Users cannot complete purchases"

# 2. Reprioritize everything
npm run task:sync

# 3. Tell Claude
"Critical bug reported: payment system down. Let's pause current work and fix this first"
```

## 10. Monitoring Task Health

Create `scripts/task-health.js`:
```javascript
const tasks = require('./.taskmaster/tasks/tasks.json');

// Check for stale "in progress" tasks
const stale = tasks.master.tasks.filter(t => 
  t.status === 'in progress' && 
  new Date(t.updated) < new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
);

if (stale.length > 0) {
  console.log('⚠️  Stale tasks detected:');
  stale.forEach(t => console.log(`  - Task ${t.id}: ${t.title}`));
}

// Check for blocked tasks
const blocked = tasks.master.tasks.filter(t => t.status === 'blocked');
if (blocked.length > 0) {
  console.log('🚫 Blocked tasks:');
  blocked.forEach(t => console.log(`  - Task ${t.id}: ${t.title}`));
}
```

Run daily: `node scripts/task-health.js`