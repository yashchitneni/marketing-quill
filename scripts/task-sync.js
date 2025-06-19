#!/usr/bin/env node

/**
 * Task Synchronization Script
 * Automatically updates task statuses and reprioritizes based on:
 * - Current bugs/issues
 * - Dependencies
 * - Business impact
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Task priority scoring system
const PRIORITY_WEIGHTS = {
  bug: 100,           // Bugs get highest priority
  security: 90,       // Security issues
  blocking: 80,       // Blocking other work
  user_reported: 70,  // User-reported issues
  feature: 50,        // New features
  enhancement: 30,    // Improvements
  documentation: 10   // Docs
};

// Read current tasks
function getCurrentTasks() {
  try {
    const tasksPath = path.join(process.cwd(), '.taskmaster/tasks/tasks.json');
    const tasksData = fs.readFileSync(tasksPath, 'utf8');
    return JSON.parse(tasksData);
  } catch (error) {
    console.error('Error reading tasks:', error);
    return null;
  }
}

// Get GitHub issues (if repo is connected)
function getGitHubIssues() {
  try {
    const issues = execSync('gh issue list --json number,title,labels,state', { encoding: 'utf8' });
    return JSON.parse(issues);
  } catch (error) {
    console.log('GitHub CLI not configured or no issues found');
    return [];
  }
}

// Calculate priority score
function calculatePriority(task, issues = []) {
  let score = 0;
  
  // Check if task relates to any open issues
  const relatedIssues = issues.filter(issue => 
    issue.title.toLowerCase().includes(task.title.toLowerCase()) ||
    task.title.toLowerCase().includes(issue.title.toLowerCase())
  );
  
  // Add score based on issue labels
  relatedIssues.forEach(issue => {
    issue.labels.forEach(label => {
      const labelName = label.name.toLowerCase();
      Object.keys(PRIORITY_WEIGHTS).forEach(key => {
        if (labelName.includes(key)) {
          score += PRIORITY_WEIGHTS[key];
        }
      });
    });
  });
  
  // Add base score from existing priority
  if (task.priority === 'high') score += 50;
  if (task.priority === 'medium') score += 30;
  if (task.priority === 'low') score += 10;
  
  // Boost score for tasks with completed dependencies
  if (task.dependencies && task.dependencies.length > 0) {
    const tasks = getCurrentTasks();
    const allDepsComplete = task.dependencies.every(depId => {
      const depTask = tasks.master.tasks.find(t => t.id === depId);
      return depTask && depTask.status === 'done';
    });
    if (allDepsComplete) score += 25;
  }
  
  return score;
}

// Reprioritize tasks
function reprioritizeTasks() {
  const tasksData = getCurrentTasks();
  if (!tasksData) return;
  
  const issues = getGitHubIssues();
  const tasks = tasksData.master.tasks;
  
  // Calculate scores for pending tasks
  const pendingTasks = tasks
    .filter(task => task.status === 'pending')
    .map(task => ({
      ...task,
      calculatedScore: calculatePriority(task, issues)
    }))
    .sort((a, b) => b.calculatedScore - a.calculatedScore);
  
  console.log('\n📊 Task Priority Report\n');
  console.log('Priority | Score | Task');
  console.log('---------|-------|-----');
  
  pendingTasks.forEach((task, index) => {
    const newPriority = index < 3 ? 'high' : index < 7 ? 'medium' : 'low';
    console.log(`${newPriority.padEnd(8)} | ${String(task.calculatedScore).padEnd(5)} | ${task.title}`);
    
    // Update priority if changed
    if (task.priority !== newPriority) {
      try {
        execSync(`npx task-master-ai update ${task.id} --priority ${newPriority}`, { stdio: 'ignore' });
      } catch (error) {
        console.error(`Failed to update task ${task.id}:`, error.message);
      }
    }
  });
}

// Create bug report task
function createBugTask(title, description, relatedTaskId = null) {
  const command = `npx task-master-ai add "${title}" "${description}" --priority high`;
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ Created bug task: ${title}`);
  } catch (error) {
    console.error('Failed to create bug task:', error);
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args[0] === 'bug') {
    // Quick bug creation: npm run task-sync bug "Title" "Description"
    createBugTask(args[1], args[2]);
  } else if (args[0] === 'status') {
    // Update task status: npm run task-sync status 6 "in progress"
    const [, taskId, status] = args;
    execSync(`npx task-master-ai set-status ${taskId} "${status}"`, { stdio: 'inherit' });
  } else {
    // Default: reprioritize all tasks
    reprioritizeTasks();
  }
}

module.exports = { reprioritizeTasks, createBugTask };