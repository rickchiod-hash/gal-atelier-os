import { test, expect } from '@playwright/test';

test.describe('Quote Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display quote form section', async ({ page }) => {
    // Look for quote-related text or form elements
    const quoteForm = page.locator('form, section');
    await expect(quoteForm.first()).toBeVisible();
  });

  test('should have client name input', async ({ page }) => {
    // Search for name input field
    const nameInput = page.getByRole('textbox', { name: /nome/i })
      .or(page.getByLabel(/nome/i, { exact: false }));
    await expect(nameInput.first()).toBeVisible();
  });

  test('should have whatsapp input', async ({ page }) => {
    const whatsappInput = page.getByRole('textbox', { name: /whatsapp|telefone/i })
      .or(page.getByLabel(/whatsapp/i, { exact: false }));
    await expect(whatsappInput.first()).toBeVisible();
  });

  test('should have service type selector', async ({ page }) => {
    const serviceSelect = page.getByRole('combobox', { name: /tipo|serviço/i })
      .or(page.getByLabel(/tipo/i, { exact: false }));
    await expect(serviceSelect.first()).toBeVisible();
  });

  test('should have submit button', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /enviar|submit|enviar orçamento/i });
    await expect(submitButton.first()).toBeVisible();
  });
});