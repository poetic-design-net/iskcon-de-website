import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ISKCON/);
});

test('navigation is visible', async ({ page }) => {
  await page.goto('/');

  // Check main navigation items
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Philosophie' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Tempel' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Events' })).toBeVisible();
});

test('hero section loads', async ({ page }) => {
  await page.goto('/');

  // Check hero section is visible
  const heroSection = page.locator('section').first();
  await expect(heroSection).toBeVisible();
  
  // Check for main heading
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
});

test('philosophy pages load correctly', async ({ page }) => {
  // Test Krishna page
  await page.goto('/philosophie/krishna');
  await expect(page).toHaveTitle(/Krishna/);
  await expect(page.locator('h1')).toContainText('Krishna');

  // Test Vedische Schriften page
  await page.goto('/philosophie/vedische-schriften');
  await expect(page).toHaveTitle(/Vedische Schriften/);
  await expect(page.locator('h1')).toContainText('Vedische Schriften');
});