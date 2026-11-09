import { expect, test } from '@playwright/test';

for (const language of ['it', 'en']) {
  const route = language === 'it' ? '/demo/' : '/en/demo/';
  const alternate = language === 'it' ? '/en/demo/' : '/demo/';
  for (const width of [390, 1024, 1440]) {
    test(`complete deployment guide is readable (${language}, ${width})`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(`${route}?nolocale=1`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', language);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(page.locator('article h2').first()).toHaveAttribute('id', 'requirements');
      await expect(page.locator('article h2')).toHaveCount(9);
      for (const section of ['requirements', 'license', 'template', 'wiring', 'configuration', 'deployment', 'inference', 'purchase', 'operations']) {
        await expect(page.locator(`article #${section}`)).toHaveCount(1);
        await expect(page.locator(`.guide-toc a[href="#${section}"]`)).toHaveCount(1);
      }
      const content = await page.locator('article').innerText();
      for (const term of ['Kubernetes', 'Licman', 'On Premise', 'release-fetch', 'deploy-release', 'license-replace', 'OpenBao', '/api/v1/stripe/webhook']) {
        expect(content).toContain(term);
      }
      expect(content).not.toMatch(/dckr_pat_/);
      await expect(page.locator('article a[href="https://licman-saas.netter.io/"]')).toHaveCount(2);
      const other = language === 'it' ? 'en' : 'it';
      await expect(page.locator(`.bar a[hreflang="${other}"]`).first()).toHaveAttribute('href', alternate);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://ventic.it${route}`);
      await expect(page.locator(`.foot a[href="${route}"]`)).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    });
  }

  test(`guide is usable without JavaScript (${language})`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    try {
      const page = await context.newPage();
      await page.goto(`${baseURL}${route}`);
      await expect(page.locator('article #purchase')).toBeVisible();
      expect(await page.locator('article').innerText()).toContain('license-replace');
    } finally {
      await context.close();
    }
  });
}

test('the guide is linked from both home pages', async ({ page }) => {
  for (const prefix of ['', '/en']) {
    await page.goto(`${prefix}/?nolocale=1`);
    await expect(page.locator(`.bar a[href="${prefix}/demo/"]`).first()).toBeAttached();
    await expect(page.locator(`.foot a[href="${prefix}/demo/"]`)).toBeVisible();
  }
});
