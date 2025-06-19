// Test script to check for browser console errors
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Listen for console messages
  page.on('console', msg => {
    console.log(`${msg.type()}: ${msg.text()}`);
  });
  
  // Listen for page errors
  page.on('pageerror', error => {
    console.error('Page error:', error.message);
  });
  
  // Listen for request failures
  page.on('requestfailed', request => {
    console.error('Request failed:', request.url(), request.failure().errorText);
  });
  
  try {
    // Navigate to the page
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Wait a bit for any delayed errors
    await page.waitForTimeout(2000);
    
    // Check if the page content is visible
    const pageContent = await page.evaluate(() => {
      return {
        title: document.title,
        bodyText: document.body.innerText.substring(0, 200),
        hasNavbar: !!document.querySelector('nav'),
        hasHeroSection: !!document.querySelector('[class*="hero"]') || !!document.querySelector('h1')
      };
    });
    
    console.log('\nPage loaded successfully:');
    console.log('Title:', pageContent.title);
    console.log('Has navbar:', pageContent.hasNavbar);
    console.log('Has hero section:', pageContent.hasHeroSection);
    console.log('Body preview:', pageContent.bodyText);
    
  } catch (error) {
    console.error('Error loading page:', error.message);
  } finally {
    await browser.close();
  }
})();