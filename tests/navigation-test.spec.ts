import { test, expect } from '@playwright/test';

test('check navigation icons in Philosophy mega menu', async ({ page }) => {
  // Navigate to homepage
  await page.goto('/');
  
  // Wait for navigation to load
  await page.waitForSelector('nav');
  
  // Hover over Philosophy menu item to open mega menu
  await page.hover('text=Philosophie');
  
  // Wait for mega menu to appear
  await page.waitForSelector('.mega-menu-dropdown', { state: 'visible' });
  
  // Take a screenshot of the mega menu
  await page.screenshot({ 
    path: 'philosophy-mega-menu.png',
    fullPage: false,
    clip: {
      x: 0,
      y: 0,
      width: 1200,
      height: 600
    }
  });
  
  // Check for icons in the mega menu
  const menuItems = await page.locator('.mega-menu-dropdown a').all();
  console.log(`Found ${menuItems.length} menu items`);
  
  for (const item of menuItems) {
    const text = await item.textContent();
    const hasIcon = await item.locator('svg').count() > 0;
    console.log(`${text?.trim()}: ${hasIcon ? 'HAS ICON' : 'NO ICON'}`);
    
    // Special check for Literatur
    if (text?.includes('Literatur')) {
      const iconElement = await item.locator('svg').first();
      if (hasIcon) {
        const iconClasses = await iconElement.getAttribute('class');
        console.log(`Literatur icon classes: ${iconClasses}`);
      }
    }
  }
  
  // Specifically check for Literatur item
  const literaturItem = page.locator('.mega-menu-dropdown a:has-text("Literatur")');
  await expect(literaturItem).toBeVisible();
  
  // Check if Literatur has an icon
  const literaturIcon = literaturItem.locator('svg');
  const iconCount = await literaturIcon.count();
  console.log(`Literatur icon count: ${iconCount}`);
  
  // Get the HTML of the Literatur item to debug
  const literaturHTML = await literaturItem.innerHTML();
  console.log('Literatur item HTML:', literaturHTML);
});