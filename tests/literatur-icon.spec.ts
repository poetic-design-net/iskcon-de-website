import { test, expect } from '@playwright/test';

test('Check Literatur icon in Philosophy mega-menu', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('http://localhost:5175');
  
  // Wait for the page to fully load
  await page.waitForLoadState('networkidle');
  
  // Find and hover over the Philosophy menu item to open the mega-menu
  const philosophyTrigger = page.locator('nav').locator('text=Philosophie');
  await philosophyTrigger.hover();
  
  // Wait for the mega-menu to be visible
  await page.waitForTimeout(500); // Give it time to animate
  
  // Find the Literatur link in the mega-menu
  const literaturLink = page.locator('a:has-text("Literatur")').first();
  
  // Check if the Literatur link exists
  const literaturExists = await literaturLink.count() > 0;
  console.log('Literatur link exists:', literaturExists);
  
  if (literaturExists) {
    // Get the HTML of the Literatur link item
    const literaturHTML = await literaturLink.evaluate(el => el.outerHTML);
    console.log('Literatur link HTML:', literaturHTML);
    
    // Also check for the parent element that might contain the icon
    const literaturParent = await literaturLink.evaluate(el => el.parentElement?.outerHTML || 'No parent element');
    console.log('Literatur link parent HTML:', literaturParent);
    
    // Check if there's an icon element (could be svg, img, or icon component)
    const iconInLink = await literaturLink.locator('svg, img, [class*="icon"], [data-icon]').count();
    console.log('Icon elements found inside Literatur link:', iconInLink);
    
    // Check for icon in the parent container
    const parentContainer = literaturLink.locator('..');
    const iconInParent = await parentContainer.locator('svg, img, [class*="icon"], [data-icon]').count();
    console.log('Icon elements found in parent container:', iconInParent);
    
    // Get all classes on the link to check for icon-related classes
    const linkClasses = await literaturLink.getAttribute('class');
    console.log('Literatur link classes:', linkClasses);
    
    // Take a screenshot of the mega-menu for visual inspection
    await page.screenshot({ path: 'philosophy-megamenu.png', fullPage: false });
    
    // Also take a focused screenshot of just the Literatur area
    const literaturBoundingBox = await literaturLink.boundingBox();
    if (literaturBoundingBox) {
      await page.screenshot({ 
        path: 'literatur-link-focused.png', 
        clip: {
          x: literaturBoundingBox.x - 50,
          y: literaturBoundingBox.y - 20,
          width: literaturBoundingBox.width + 100,
          height: literaturBoundingBox.height + 40
        }
      });
    }
  } else {
    console.log('ERROR: Literatur link not found in Philosophy mega-menu');
  }
  
  // Let's also check the entire mega-menu structure
  const megaMenu = page.locator('[role="dialog"], [aria-label*="menu"], .mega-menu, [class*="mega-menu"]').first();
  const megaMenuHTML = await megaMenu.evaluate(el => el.innerHTML);
  console.log('Full mega-menu HTML structure:', megaMenuHTML.substring(0, 2000) + '...');
});