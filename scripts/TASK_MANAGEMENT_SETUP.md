# Task Management System Setup Guide

This guide helps you set up the Claude + task-master-ai integration in any project.

## Files Created

### 1. Core Scripts (in `/scripts/` folder)
- `task-sync.js` - Automatic prioritization and bug tracking
- `task-health.js` - Health monitoring for tasks
- `claude-status.js` - Track what Claude is working on
- `claude-task-integration.md` - Full documentation

### 2. Configuration Files
- `.vscode/tasks.json` - VS Code integration
- `CLAUDE.md` - Instructions for Claude AI
- Updated `package.json` - NPM scripts
- Updated `.gitignore` - Ignore status files

## Setup Instructions for New Projects

### Step 1: Install task-master-ai
```bash
npm install -g task-master-ai
# or use npx task-master-ai
```

### Step 2: Initialize task-master in your project
```bash
cd your-project
npx task-master-ai init
```

### Step 3: Copy the scripts folder
Copy these files from this project to your new project:
```bash
# Create scripts directory
mkdir -p scripts

# Copy the core files
cp path/to/marketing-quill/scripts/task-sync.js ./scripts/
cp path/to/marketing-quill/scripts/task-health.js ./scripts/
cp path/to/marketing-quill/scripts/claude-status.js ./scripts/
cp path/to/marketing-quill/scripts/claude-task-integration.md ./scripts/
```

### Step 4: Add NPM scripts to package.json
Add these to your `package.json` scripts section:
```json
{
  "scripts": {
    // ... your existing scripts ...
    "task:sync": "node scripts/task-sync.js",
    "task:bug": "node scripts/task-sync.js bug",
    "task:status": "node scripts/task-sync.js status",
    "task:list": "npx task-master-ai list",
    "task:current": "npx task-master-ai list --status 'in progress'",
    "task:health": "node scripts/task-health.js",
    "claude:start": "node scripts/claude-status.js start",
    "claude:update": "node scripts/claude-status.js update",
    "claude:done": "node scripts/claude-status.js complete",
    "claude:status": "node scripts/claude-status.js status"
  }
}
```

### Step 5: Copy VS Code integration (optional)
```bash
mkdir -p .vscode
cp path/to/marketing-quill/.vscode/tasks.json ./.vscode/
```

### Step 6: Create CLAUDE.md
Copy and customize the CLAUDE.md file for your project:
```bash
cp path/to/marketing-quill/CLAUDE.md ./
# Edit to reflect your project's specifics
```

### Step 7: Update .gitignore
Add these lines to your `.gitignore`:
```
# Claude integration
.claude-status.json
.claude-history.json
```

## Quick Setup Script

Save this as `setup-task-management.sh`:
```bash
#!/bin/bash

# Task Management Setup Script
echo "Setting up task management system..."

# Create directories
mkdir -p scripts .vscode

# Download scripts from GitHub (if you host them)
# Or copy from local marketing-quill project
SOURCE_DIR="path/to/marketing-quill"

# Copy scripts
cp "$SOURCE_DIR/scripts/task-sync.js" ./scripts/
cp "$SOURCE_DIR/scripts/task-health.js" ./scripts/
cp "$SOURCE_DIR/scripts/claude-status.js" ./scripts/
cp "$SOURCE_DIR/scripts/claude-task-integration.md" ./scripts/
cp "$SOURCE_DIR/.vscode/tasks.json" ./.vscode/
cp "$SOURCE_DIR/CLAUDE.md" ./

# Update .gitignore
echo -e "\n# Claude integration\n.claude-status.json\n.claude-history.json" >> .gitignore

echo "✅ Task management system setup complete!"
echo "📝 Remember to add the npm scripts to your package.json"
echo "🚀 Run 'npx task-master-ai init' to initialize tasks"
```

## Customization Points

### 1. Priority Weights (in task-sync.js)
```javascript
const PRIORITY_WEIGHTS = {
  bug: 100,           // Adjust based on your needs
  security: 90,       
  blocking: 80,       
  user_reported: 70,  
  feature: 50,        
  enhancement: 30,    
  documentation: 10   
};
```

### 2. Stale Task Duration (in task-health.js)
```javascript
// Change from 3 days to whatever makes sense
const daysSinceUpdate = (now - updated) / (1000 * 60 * 60 * 24);
return daysSinceUpdate > 3; // Adjust this number
```

### 3. VS Code Tasks
Customize the tasks in `.vscode/tasks.json` for your workflow

## GitHub Integration (Optional)

If using GitHub:
1. Install GitHub CLI: `brew install gh`
2. Authenticate: `gh auth login`
3. The task-sync.js script will automatically pull issues

## Usage Cheatsheet

```bash
# Daily workflow
npm run task:health         # Morning check
npm run task:sync          # Reprioritize
npm run task:current       # What's active

# During development
npm run task:bug "Title" "Description"
npm run task:status 5 "in progress"
npm run claude:start 5 "Feature Name"
npm run claude:update "Progress description"
npm run claude:done

# Quick commands
npm run task:list          # All tasks
npx task-master-ai add "New Task" "Description"
npx task-master-ai set-status 5 done
```

## Troubleshooting

1. **Scripts not found**: Make sure scripts are executable
   ```bash
   chmod +x scripts/*.js
   ```

2. **task-master-ai not found**: Install globally or use npx
   ```bash
   npm install -g task-master-ai
   ```

3. **GitHub integration not working**: Check gh auth
   ```bash
   gh auth status
   ```