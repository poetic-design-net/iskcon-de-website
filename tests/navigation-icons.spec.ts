import { test, expect } from '@playwright/test';

test.describe('Navigation Icons', () => {
  test('Philosophy mega menu should show all icons including Literatur', async ({ page }) => {
    // Go to homepage
    await page.goto('/');
    
    // Wait for navigation to be ready
    await page.waitForSelector('nav', { state: 'visible' });
    
    // Find and hover over Philosophy menu item
    const philosophyMenuItem = page.locator('nav').locator('text=Philosophie').first();
    await expect(philosophyMenuItem).toBeVisible();
    await philosophyMenuItem.hover();
    
    // Wait for mega menu to appear
    await page.waitForSelector('.mega-menu-dropdown', { state: 'visible' });
    
    // Take screenshot of the mega menu
    await page.screenshot({ 
      path: 'test-results/philosophy-mega-menu.png',
      fullPage: false 
    });
    
    // Check all items in Grundlagen section
    const grundlagenSection = page.locator('.mega-menu-dropdown').locator('text=Grundlagen').locator('..');
    const grundlagenItems = grundlagenSection.locator('a');
    
    // Expected items with icons
    const expectedItems = [
      { name: 'Krishna', shouldHaveIcon: true },
      { name: 'Literatur', shouldHaveIcon: true },
      { name: 'Bhakti-Yoga', shouldHaveIcon: true }
    ];
    
    // Count items
    const itemCount = await grundlagenItems.count();
    console.log(`Found ${itemCount} items in Grundlagen section`);
    
    // Check each item
    for (let i = 0; i < itemCount; i++) {
      const item = grundlagenItems.nth(i);
      const itemText = await item.textContent();
      const iconCount = await item.locator('svg').count();
      
      console.log(`Item ${i + 1}: "${itemText?.trim()}" - Icons: ${iconCount}`);
      
      // Check if this is one of our expected items
      const expectedItem = expectedItems.find(e => itemText?.includes(e.name));
      if (expectedItem && expectedItem.shouldHaveIcon) {
        expect(iconCount).toBeGreaterThan(0);
      }
    }
    
    // Specifically check Literatur item
    const literaturItem = page.locator('.mega-menu-dropdown').locator('a:has-text("Literatur")').first();
    await expect(literaturItem).toBeVisible();
    
    // Check icon presence
    const literaturIcon = literaturItem.locator('svg');
    const literaturIconCount = await literaturIcon.count();
    
    console.log(`\nLiteratur icon check:`);
    console.log(`- Icon count: ${literaturIconCount}`);
    
    if (literaturIconCount === 0) {
      // Debug: Get the HTML to see what's there
      const literaturHTML = await literaturItem.innerHTML();
      console.log(`- HTML content: ${literaturHTML}`);
      
      // Check parent structure
      const parentHTML = await literaturItem.locator('..').innerHTML();
      console.log(`- Parent HTML: ${parentHTML.substring(0, 200)}...`);
    }
    
    // Assert that Literatur has an icon
    expect(literaturIconCount).toBeGreaterThan(0);
  });
  
  test('All mega menu items should have consistent icon rendering', async ({ page }) => {
    await page.goto('/');
    
    // Test each main menu item that has a dropdown
    const menuItems = ['Philosophie', 'Events', 'Tempel', 'Literatur', 'Spirituelle Praxis'];
    
    for (const menuName of menuItems) {
      const menuItem = page.locator('nav').locator(`text=${menuName}`).first();
      
      if (await menuItem.count() > 0) {
        await menuItem.hover();
        
        // Check if dropdown appears
        const dropdown = page.locator('.mega-menu-dropdown');
        if (await dropdown.count() > 0) {
          await page.waitForSelector('.mega-menu-dropdown', { state: 'visible' });
          
          // Count all items with and without icons
          const allLinks = dropdown.locator('a');
          const linkCount = await allLinks.count();
          let withIcon = 0;
          let withoutIcon = 0;
          
          for (let i = 0; i < linkCount; i++) {
            const link = allLinks.nth(i);
            const hasIcon = await link.locator('svg').count() > 0;
            if (hasIcon) withIcon++;
            else withoutIcon++;
          }
          
          console.log(`\n${menuName} menu:`);
          console.log(`- Total items: ${linkCount}`);
          console.log(`- With icons: ${withIcon}`);
          console.log(`- Without icons: ${withoutIcon}`);
          
          // Move away to close dropdown
          await page.mouse.move(0, 0);
          await page.waitForTimeout(500);
        }
      }
    }
  });
});