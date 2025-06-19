#!/usr/bin/env node

/**
 * Task Health Monitoring Script
 * Checks for stale tasks, blocked tasks, and other health indicators
 */

const fs = require('fs');
const path = require('path');

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

function checkTaskHealth() {
  const tasksData = getCurrentTasks();
  if (!tasksData) return;

  const tasks = tasksData.master.tasks;
  const now = new Date();
  
  console.log('\n📊 Task Health Report\n');
  console.log(`Total Tasks: ${tasks.length}`);
  console.log(`Completed: ${tasks.filter(t => t.status === 'done').length}`);
  console.log(`In Progress: ${tasks.filter(t => t.status === 'in progress').length}`);
  console.log(`Pending: ${tasks.filter(t => t.status === 'pending').length}`);
  console.log(`Blocked: ${tasks.filter(t => t.status === 'blocked').length}\n`);

  // Check for stale "in progress" tasks (older than 3 days)
  const stale = tasks.filter(t => {
    if (t.status !== 'in progress') return false;
    const updated = new Date(tasksData.master.metadata.updated);
    const daysSinceUpdate = (now - updated) / (1000 * 60 * 60 * 24);
    return daysSinceUpdate > 3;
  });

  if (stale.length > 0) {
    console.log('⚠️  Stale "In Progress" Tasks (>3 days):');
    stale.forEach(t => {
      console.log(`   - Task ${t.id}: ${t.title}`);
    });
    console.log('   Consider updating status or breaking into smaller tasks\n');
  }

  // Check for blocked tasks
  const blocked = tasks.filter(t => t.status === 'blocked');
  if (blocked.length > 0) {
    console.log('🚫 Blocked Tasks:');
    blocked.forEach(t => {
      console.log(`   - Task ${t.id}: ${t.title}`);
      // Check if dependencies are complete
      if (t.dependencies && t.dependencies.length > 0) {
        const blockingTasks = t.dependencies
          .map(depId => tasks.find(task => task.id === depId))
          .filter(dep => dep && dep.status !== 'done');
        
        if (blockingTasks.length > 0) {
          console.log('     Blocked by:');
          blockingTasks.forEach(bt => {
            console.log(`       - Task ${bt.id}: ${bt.title} (${bt.status})`);
          });
        }
      }
    });
    console.log('');
  }

  // Check for high-priority pending tasks
  const highPriorityPending = tasks.filter(t => 
    t.status === 'pending' && t.priority === 'high'
  );
  
  if (highPriorityPending.length > 0) {
    console.log('🔥 High Priority Pending Tasks:');
    highPriorityPending.forEach(t => {
      console.log(`   - Task ${t.id}: ${t.title}`);
      // Check if dependencies are met
      if (t.dependencies && t.dependencies.length > 0) {
        const unmetDeps = t.dependencies
          .map(depId => tasks.find(task => task.id === depId))
          .filter(dep => dep && dep.status !== 'done');
        
        if (unmetDeps.length === 0) {
          console.log('     ✅ All dependencies met - ready to start!');
        } else {
          console.log(`     ⏳ Waiting on ${unmetDeps.length} dependencies`);
        }
      } else {
        console.log('     ✅ No dependencies - ready to start!');
      }
    });
    console.log('');
  }

  // Task completion velocity
  const completedTasks = tasks.filter(t => t.status === 'done');
  if (completedTasks.length > 0) {
    console.log('📈 Progress Summary:');
    console.log(`   - ${completedTasks.length}/${tasks.length} tasks completed (${Math.round(completedTasks.length/tasks.length*100)}%)`);
    
    // Group by priority
    const completedByPriority = {
      high: completedTasks.filter(t => t.priority === 'high').length,
      medium: completedTasks.filter(t => t.priority === 'medium').length,
      low: completedTasks.filter(t => t.priority === 'low').length
    };
    console.log(`   - High priority: ${completedByPriority.high} completed`);
    console.log(`   - Medium priority: ${completedByPriority.medium} completed`);
    console.log(`   - Low priority: ${completedByPriority.low} completed`);
  }

  // Recommendations
  console.log('\n💡 Recommendations:');
  
  if (stale.length > 0) {
    console.log('   - Review stale "in progress" tasks');
  }
  
  if (blocked.length > 0) {
    console.log('   - Address blocking dependencies');
  }
  
  const inProgress = tasks.filter(t => t.status === 'in progress');
  if (inProgress.length === 0 && highPriorityPending.length > 0) {
    console.log('   - Start working on a high-priority task');
  } else if (inProgress.length > 3) {
    console.log('   - Consider focusing on fewer tasks at once');
  }

  console.log('\n✨ Run "npm run task:sync" to reprioritize based on current state\n');
}

// Run the health check
if (require.main === module) {
  checkTaskHealth();
}

module.exports = { checkTaskHealth };