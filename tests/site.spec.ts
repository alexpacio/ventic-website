import { expect, test } from '@playwright/test';

const langs = [
  { lang: 'it', home: '/', pre: '', demo: '/demo/', pages: ['/', '/why-ventic/', '/how-it-works/', '/platform/', '/on-premise/', '/pricing/', '/termini/', '/privacy/', '/admin-panel/', '/demo/'], h2: 'Requisiti' },
  { lang: 'en', home: '/en/', pre: '/en', demo: '/en/demo/', pages: ['/en/', '/en/why-ventic/', '/en/how-it-works/', '/en/platform/', '/en/on-premise/', '/en/pricing/', '/en/terms/', '/en/privacy/', '/en/admin-panel/', '/en/demo/'], h2: 'Requirements' },
] as const;

for (const { lang, home, pre, demo, pages, h2 } of langs) {
  const how = `${pre}/how-it-works/`;
  const onprem = `${pre}/on-premise/`;
  const noOverflow = async (page: import('@playwright/test').Page, label: string) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${label} width ${width}`).toBe(true);
    }
  };

  test(`every page has one h1 and no overflow (${lang})`, async ({ page }) => {
    for (const path of pages) {
      await page.goto(`${path}?nolocale=1`);
      await expect(page.locator('h1'), path).toHaveCount(1);
      await noOverflow(page, path);
    }
  });

  test(`home is a landing page linking to the split pages (${lang})`, async ({ page }) => {
    await page.goto(`${home}?nolocale=1`);
    for (const slug of ['why-ventic', 'how-it-works', 'platform', 'on-premise']) {
      await expect(page.locator(`#esplora a[href="${pre}/${slug}/"]`), slug).toHaveCount(1);
    }
    // sections that moved out must not be on the home any more
    for (const id of ['#perche', '#why', '#stack', '#sotto-il-cofano', '#schemi', '#on-premise']) {
      await expect(page.locator(id), id).toHaveCount(0);
    }
  });

  test(`menu is grouped, opens dropdowns and marks the current page (${lang})`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${how}?nolocale=1`);
    const triggers = page.locator('.bar .trigger');
    await expect(triggers).toHaveCount(2);
    const product = triggers.first();
    await expect(page.locator('.bar .pop').first()).toBeHidden();
    await product.click();
    await expect(product).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.bar .pop').first().locator('a')).toHaveCount(4);
    await expect(page.locator(`.bar .pop a[href="${how}"]`)).toHaveAttribute('aria-current', 'page');
    await expect(product).toHaveAttribute('data-active', 'true');
    await page.keyboard.press('Escape');
    await expect(product).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('.bar .pop').first()).toBeHidden();
    // keyboard: ArrowDown opens and focuses the first entry
    await product.focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('.bar .pop a').first()).toBeFocused();
    // hover opens the second group
    await page.mouse.move(0, 400);
    await triggers.nth(1).hover();
    await expect(page.locator('.bar .pop').nth(1)).toBeVisible();
    await expect(page.locator(`.bar .pop a[href="${onprem}"]`)).toBeVisible();
  });

  test(`mobile menu lists every group and closes on navigation (${lang})`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto(`${home}?nolocale=1`);
    await page.locator('.bar .menu summary').click();
    await expect(page.locator('.bar .drawer .dlabel')).toHaveCount(2);
    for (const slug of ['why-ventic', 'how-it-works', 'platform', 'on-premise', 'admin-panel', 'pricing', 'demo']) {
      await expect(page.locator(`.bar .drawer a[href="${pre}/${slug}/"]`), slug).toBeVisible();
    }
    await page.locator(`.bar .drawer a[href="${how}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${how}`));
  });

  test(`motion layer: button fill, headline wipe, auto-hiding bar (${lang})`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${how}?nolocale=1`);
    await expect(page.locator('.bar .cta .fill i')).toHaveCount(5);
    await expect(page.locator('.bar .cta .roll')).toHaveAttribute('data-t', /\S/);
    // headline words start hidden, the wipe reveals them and the bars clean up
    const h = page.locator('h1.wipe');
    await expect(h.locator('.w').first()).toHaveCSS('opacity', '1');
    await expect(h.locator('.wipe-bar')).toHaveCount(0);
    // bar hides on scroll down, returns on scroll up
    await page.mouse.move(700, 500);
    await page.mouse.wheel(0, 1500);
    await expect(page.locator('header.bar')).toHaveAttribute('data-hidden', '');
    await page.mouse.wheel(0, -300);
    await expect(page.locator('header.bar')).not.toHaveAttribute('data-hidden', '');
  });

  test(`no Alpha / early-access wording anywhere (${lang})`, async ({ page }) => {
    for (const path of pages) {
      await page.goto(`${path}?nolocale=1`);
      const text = (await page.locator('body').innerText()) + (await page.title());
      expect(text, path).not.toMatch(/\balpha\b|early access|accesso anticipato|beta\/ga/i);
      await expect(page.locator('.bar .brand'), path).not.toContainText(/alpha/i);
    }
  });

  test(`sub-pages show the new sections (${lang})`, async ({ page }) => {
    await page.goto(`${how}?nolocale=1`);
    await expect(page.locator('#sotto-il-cofano .cell')).toHaveCount(12);
    await expect(page.locator('#schemi figure.scheme')).toHaveCount(5);
    await expect(page.locator('#schemi figure.scheme svg[role="img"]')).toHaveCount(5);
    await page.goto(`${onprem}?nolocale=1`);
    await expect(page.locator('#on-premise .step')).toHaveCount(8);
    await expect(page.locator('#on-premise a[href="https://github.com/nettersrl/ventic-provider-template"]').first()).toBeVisible();
    await expect(page.locator(`#on-premise a[href="${demo}"]`)).toHaveCount(1);
    await expect(page.locator(`.bar a[href="${onprem}"]`).first()).toBeAttached();
  });

  test(`diagram nodes stay inside their viewBox (${lang})`, async ({ page }) => {
    await page.goto(`${how}?nolocale=1`);
    const bad = await page.evaluate(() =>
      [...document.querySelectorAll('#schemi svg[role="img"]')].flatMap((svg, i) => {
        const vb = (svg as SVGSVGElement).viewBox.baseVal;
        return [...svg.querySelectorAll('rect, text')].flatMap((el) => {
          const b = (el as SVGGraphicsElement).getBBox();
          return b.x < -1 || b.y < -1 || b.x + b.width > vb.width + 1 || b.y + b.height > vb.height + 1 ? [`svg${i}:${el.textContent?.slice(0, 20)}`] : [];
        });
      }),
    );
    expect(bad).toEqual([]);
  });

  test(`guide copy-for-AI-agent button (${lang})`, async ({ page, context, baseURL }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: baseURL! });
    await page.goto(`${demo}?nolocale=1`);
    await page.locator('.guide-hero [data-agent-copy]').click();
    await expect(page.locator('.guide-hero [data-status]')).not.toBeEmpty();
    const clip = await page.evaluate(() => navigator.clipboard.readText());

    // agent rules first, then the entire guide, as markdown
    expect(clip.startsWith(lang === 'it' ? '# Compito:' : '# Task:')).toBe(true);
    expect(clip).toContain('github.com/nettersrl/ventic-provider-template');
    expect(clip).toMatch(/^## /m);
    for (const term of [h2, 'make release-fetch', 'make deploy-release', 'license-replace', 'OpenBao', '/api/v1/stripe/webhook']) {
      expect(clip).toContain(term);
    }
    // every section of the page is in the copied text
    const headings = await page.locator('article h2').evaluateAll((els) => els.map((e) => e.textContent ?? ''));
    expect(headings).toHaveLength(9);
    for (const h of headings) expect(clip).toContain(h.trim());
    // cleaned: no frontmatter, no raw anchor HTML, no secrets
    expect(clip).not.toMatch(/^layout:|<h2 id=/m);
    expect(clip).not.toMatch(/dckr_pat_/);
    expect(clip.length).toBeGreaterThan(15_000);

    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('.guide-hero [data-agent-download]').click()]);
    expect(download.suggestedFilename()).toMatch(/\.md$/);
  });

  test(`on-premise page also offers the agent button (${lang})`, async ({ page, context, baseURL }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: baseURL! });
    await page.goto(`${onprem}?nolocale=1`);
    await page.locator('#on-premise [data-agent-copy]').click();
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain('make deploy-release');
    expect(clip).toContain(lang === 'it' ? 'Regole' : 'Rules');
  });

  test(`step code blocks copy to the clipboard (${lang})`, async ({ page, context, baseURL }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: baseURL! });
    await page.goto(`${onprem}?nolocale=1`);
    await page.locator('#on-premise .copy-btn').nth(2).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('make release-fetch');
  });
}

for (const { lang, path } of [{ lang: 'it', path: '/contatti/' }, { lang: 'en', path: '/en/contatti/' }]) {
  test(`contact page renders without overflow (${lang})`, async ({ page }) => {
    await page.goto(`${path}?nolocale=1`);
    await expect(page.locator('h1')).toHaveCount(1);
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });
}
