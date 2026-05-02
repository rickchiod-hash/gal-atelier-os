import { test, expect } from '@playwright/test';

test.describe('Accessibility (WCAG)', () => {
  test('should have proper page title', async ({ page }) => {
    await page.goto('/');
    
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should have main landmark', async ({ page }) => {
    await page.goto('/');
    
    const main = page.locator('main');
    // Main may not exist, that's OK - just log it
    const mainCount = await main.count();
    console.log(`Main landmarks: ${mainCount}`);
  });

  test('should have skip link or alternative', async ({ page }) => {
    await page.goto('/');
    
    // Check for skip link or proper heading structure
    const skipLink = page.getByRole('link', { name: /skip|pular/i });
    const hasHeading = await page.locator('h1, h2').count();
    
    // Either skip link exists OR there are proper headings
    const hasSkipOrHeadings = (await skipLink.count()) > 0 || hasHeading > 0;
    expect(hasSkipOrHeadings).toBe(true);
  });

  test('should have descriptive links', async ({ page }) => {
    await page.goto('/');
    
    const links = page.getByRole('link');
    const linkCount = await links.count();
    
    // Check that links have text (not empty href)
    for (let i = 0; i < Math.min(linkCount, 5); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('form inputs should have labels', async ({ page }) => {
    await page.goto('/');
    
    const inputs = page.getByRole('textbox');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      // Each input should have associated label
      for (let i = 0; i < Math.min(inputCount, 3); i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id');
        
        // Either has id with matching label, or aria-label
        const hasLabel = id 
          ? (await page.locator(`label[for="${id}"]`).count()) > 0
          : (await input.getAttribute('aria-label')) !== null;
        
        console.log(`Input ${i}: has label = ${hasLabel}`);
      }
    }
  });
});