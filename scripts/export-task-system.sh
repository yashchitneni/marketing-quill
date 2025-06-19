#!/bin/bash

# Export Task Management System
# This script packages all task management files for easy transfer to other projects

EXPORT_DIR="task-management-system"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ARCHIVE_NAME="task-management-system-${TIMESTAMP}.tar.gz"

echo "📦 Exporting Task Management System..."

# Create export directory
mkdir -p "$EXPORT_DIR/scripts"
mkdir -p "$EXPORT_DIR/.vscode"

# Copy all necessary files
echo "📁 Copying scripts..."
cp scripts/task-sync.js "$EXPORT_DIR/scripts/"
cp scripts/task-health.js "$EXPORT_DIR/scripts/"
cp scripts/claude-status.js "$EXPORT_DIR/scripts/"
cp scripts/claude-task-integration.md "$EXPORT_DIR/scripts/"
cp scripts/TASK_MANAGEMENT_SETUP.md "$EXPORT_DIR/"

echo "📁 Copying configuration files..."
cp .vscode/tasks.json "$EXPORT_DIR/.vscode/" 2>/dev/null || echo "  ⚠️  No VS Code tasks found"
cp CLAUDE.md "$EXPORT_DIR/" 2>/dev/null || echo "  ⚠️  No CLAUDE.md found"

# Create a setup script
cat > "$EXPORT_DIR/setup.sh" << 'EOF'
#!/bin/bash

echo "🚀 Setting up Task Management System..."

# Check if in a git repository
if [ ! -d .git ]; then
    echo "⚠️  Warning: Not in a git repository. Some features may not work."
fi

# Check if task-master-ai is installed
if ! command -v task-master-ai &> /dev/null && ! npx task-master-ai --version &> /dev/null; then
    echo "📦 Installing task-master-ai..."
    npm install -g task-master-ai
fi

# Initialize task-master if not already done
if [ ! -d .taskmaster ]; then
    echo "🎯 Initializing task-master-ai..."
    npx task-master-ai init
fi

# Create directories
mkdir -p scripts .vscode

# Copy files
echo "📋 Copying scripts..."
cp -r scripts/* ./scripts/ 2>/dev/null
cp -r .vscode/* ./.vscode/ 2>/dev/null
cp CLAUDE.md ./ 2>/dev/null

# Update .gitignore
if ! grep -q "claude-status.json" .gitignore 2>/dev/null; then
    echo -e "\n# Claude integration\n.claude-status.json\n.claude-history.json" >> .gitignore
    echo "✅ Updated .gitignore"
fi

# Extract package.json scripts
echo ""
echo "📝 Add these scripts to your package.json:"
echo ""
cat << 'SCRIPTS'
  "scripts": {
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
SCRIPTS

echo ""
echo "✅ Task Management System setup complete!"
echo ""
echo "🎯 Next steps:"
echo "  1. Add the scripts above to your package.json"
echo "  2. Run 'npm run task:health' to check status"
echo "  3. Run 'npm run task:sync' to prioritize tasks"
echo "  4. Check CLAUDE.md for AI assistant instructions"
echo ""
echo "📚 Full documentation in: scripts/TASK_MANAGEMENT_SETUP.md"
EOF

chmod +x "$EXPORT_DIR/setup.sh"

# Create package.json snippet
cat > "$EXPORT_DIR/package-scripts.json" << 'EOF'
{
  "scripts": {
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
EOF

# Create README
cat > "$EXPORT_DIR/README.md" << 'EOF'
# Task Management System

This is a portable task management system that integrates Claude AI with task-master-ai.

## Quick Setup

1. Extract this archive in your project root
2. Run `./setup.sh`
3. Add the scripts from `package-scripts.json` to your `package.json`

## Features

- Automatic task prioritization based on bugs and dependencies
- Claude AI integration for tracking work progress
- Health monitoring for stale tasks
- VS Code integration
- GitHub issues integration (optional)

## Usage

See `TASK_MANAGEMENT_SETUP.md` for full documentation.

### Quick Commands:
```bash
npm run task:health     # Check task health
npm run task:sync       # Reprioritize tasks
npm run task:bug "Title" "Description"  # Create bug
npm run claude:start 1 "Task Name"      # Start work
```
EOF

# Create archive
echo "📦 Creating archive..."
tar -czf "$ARCHIVE_NAME" "$EXPORT_DIR"

# Clean up
rm -rf "$EXPORT_DIR"

echo ""
echo "✅ Export complete!"
echo "📦 Archive created: $ARCHIVE_NAME"
echo ""
echo "To use in another project:"
echo "  1. Copy $ARCHIVE_NAME to your project"
echo "  2. Run: tar -xzf $ARCHIVE_NAME"
echo "  3. Run: cd task-management-system && ./setup.sh"
echo ""