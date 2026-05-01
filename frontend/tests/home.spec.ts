import { test, expect } from '@playwright/test';

test.describe('Home Page Navigation', () => {
  test('should load homepage with proper title', async ({ page }) => {
    await page.goto('/');
    
    // Verify main title is present
    await expect(page.locator('h1, h2')).toBeVisible();
  });

  test('should navigation is accessible', async ({ page }) => {
    await page.goto('/');
    
    // Verify header/navigation exists
    const nav = page.locator('nav, header');
    await expect(nav.first()).toBeVisible();
  });

  test('should have catalog link in navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check for catalog link - V6 Editorial uses text, not specific selectors
    const catalogLink = page.getByRole('link', { name: /catálogo/i });
    await expect(catalogLink.first()).toBeVisible();
  });

  test('should have contact link in navigation', async ({ page }) => {
    await page.goto('/');
    
    const contactLink = page.getByRole('link', { name: /contato/i });
    await expect(contactLink.first()).toBeVisible();
  });
});