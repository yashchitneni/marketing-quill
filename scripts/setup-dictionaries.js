const fs = require('fs');
const path = require('path');

// Create dictionaries directory in public folder
const publicDir = path.join(__dirname, '..', 'public', 'dictionaries');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy dictionary files
try {
  const dictionaryPath = path.join(__dirname, '..', 'node_modules', 'dictionary-en');
  const affPath = path.join(dictionaryPath, 'index.aff');
  const dicPath = path.join(dictionaryPath, 'index.dic');
  
  if (!fs.existsSync(affPath) || !fs.existsSync(dicPath)) {
    throw new Error('Dictionary files not found. Make sure dictionary-en is installed.');
  }
  
  fs.copyFileSync(affPath, path.join(publicDir, 'en.aff'));
  fs.copyFileSync(dicPath, path.join(publicDir, 'en.dic'));
  
  console.log('✅ Dictionary files copied successfully');
} catch (error) {
  console.error('❌ Error copying dictionary files:', error);
  process.exit(1);
}