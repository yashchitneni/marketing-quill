const fs = require('fs');
const path = require('path');

// Read the tasks.json file
const filePath = path.join(__dirname, '..', '.taskmaster', 'tasks', 'tasks.json');
let content = fs.readFileSync(filePath, 'utf8');

// Function to remove code blocks from details fields
function cleanCodeBlocks(content) {
  // Pattern to match code blocks that appear after the numbered list in details
  const pattern = /("details":\s*"[^"]+)"\s*\\n\\n[^"]+```[\s\S]*?```/g;
  
  // Replace pattern - keep only the numbered list part
  content = content.replace(pattern, '$1"');
  
  return content;
}

// Clean the content
let cleaned = cleanCodeBlocks(content);

// Parse to validate JSON
try {
  const parsed = JSON.parse(cleaned);
  
  // Write the cleaned content back
  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2));
  console.log('Successfully cleaned tasks.json');
} catch (error) {
  console.error('Error parsing JSON:', error.message);
  
  // Save a backup of the problematic content for debugging
  fs.writeFileSync(filePath + '.debug', cleaned);
  console.log('Saved debug file to:', filePath + '.debug');
}