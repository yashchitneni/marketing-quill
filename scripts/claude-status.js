#!/usr/bin/env node

/**
 * Claude Status Tracker
 * Tracks what Claude is currently working on
 */

const fs = require('fs');
const path = require('path');

const STATUS_FILE = path.join(process.cwd(), '.claude-status.json');

function updateStatus(action, data) {
  let status = {};
  
  try {
    if (fs.existsSync(STATUS_FILE)) {
      status = JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
    }
  } catch (error) {
    // Start fresh if file is corrupted
  }

  switch (action) {
    case 'start':
      status = {
        currentTask: data.taskId,
        taskTitle: data.title,
        startedAt: new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        completed: []
      };
      console.log(`✅ Claude started working on Task ${data.taskId}: ${data.title}`);
      break;
      
    case 'update':
      if (status.currentTask) {
        status.lastUpdate = new Date().toISOString();
        status.completed = status.completed || [];
        status.completed.push({
          description: data.description,
          timestamp: new Date().toISOString()
        });
        console.log(`📝 Progress update: ${data.description}`);
      }
      break;
      
    case 'complete':
      if (status.currentTask) {
        const duration = new Date() - new Date(status.startedAt);
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        
        console.log(`\n🎉 Task ${status.currentTask} completed!`);
        console.log(`⏱️  Duration: ${hours}h ${minutes}m`);
        console.log(`📋 Completed items: ${status.completed.length}`);
        
        // Archive the status
        const archive = {
          ...status,
          completedAt: new Date().toISOString(),
          duration: `${hours}h ${minutes}m`
        };
        
        // Save to history
        const historyFile = path.join(process.cwd(), '.claude-history.json');
        let history = [];
        try {
          if (fs.existsSync(historyFile)) {
            history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
          }
        } catch (error) {}
        
        history.push(archive);
        fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
        
        // Clear current status
        status = {};
      }
      break;
      
    case 'status':
      if (status.currentTask) {
        console.log(`\n🤖 Claude Status Report\n`);
        console.log(`Current Task: ${status.currentTask} - ${status.taskTitle}`);
        console.log(`Started: ${new Date(status.startedAt).toLocaleString()}`);
        console.log(`Last Update: ${new Date(status.lastUpdate).toLocaleString()}`);
        
        if (status.completed && status.completed.length > 0) {
          console.log(`\nCompleted (${status.completed.length} items):`);
          status.completed.forEach((item, i) => {
            console.log(`  ${i + 1}. ${item.description}`);
          });
        }
      } else {
        console.log('🤖 Claude is not currently working on any task');
      }
      return;
  }
  
  fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2));
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'start':
    if (args.length < 3) {
      console.error('Usage: claude-status start <taskId> <title>');
      process.exit(1);
    }
    updateStatus('start', { taskId: args[1], title: args.slice(2).join(' ') });
    break;
    
  case 'update':
    if (args.length < 2) {
      console.error('Usage: claude-status update <description>');
      process.exit(1);
    }
    updateStatus('update', { description: args.slice(1).join(' ') });
    break;
    
  case 'complete':
    updateStatus('complete', {});
    break;
    
  case 'status':
  default:
    updateStatus('status', {});
    break;
}

module.exports = { updateStatus };