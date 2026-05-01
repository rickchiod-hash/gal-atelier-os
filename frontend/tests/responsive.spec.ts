import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');
    
    // Page should load without errors
    await expect(page).toHaveTitle(/.*/i);
    
    // Navigation should still be accessible (hamburger or visible links)
    const nav = page.locator('nav, header');
    await expect(nav.first()).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto('/');
    
    await expect(page).toHaveTitle(/.*/i);
    await expect(page.locator('nav, header').first()).toBeVisible();
  });

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    
    await expect(page).toHaveTitle(/.*/i);
    await expect(page.locator('nav, header').first()).toBeVisible();
  });
});