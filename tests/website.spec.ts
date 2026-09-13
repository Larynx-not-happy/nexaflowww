import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const base = process.env['QA_BASE_URL'] || 'http://localhost:8080';
const routes = ['/', '/features', '/pricing', '/about', '/faq', '/contact', '/privacy-policy', '/terms'];
test('all pages, metadata, accessibility, assets and internal links', async ({page, request}) => {
 const links = new Set<string>(); const titles = new Set<string>(); const descriptions = new Set<string>();
 const errors:string[]=[]; page.on('pageerror', e => errors.push(e.message));
 for (const path of routes) {
  const res=await page.goto(base+path); expect(res?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  titles.add(await page.title()); descriptions.add(await page.locator('meta[name="description"]').getAttribute('content') || '');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://nexaflow.com${path==='/'?'':path}`);
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
  for (const href of await page.locator('a[href]').evaluateAll(a=>a.map(x=>x.getAttribute('href')||''))) if(href.startsWith('/')&&!href.startsWith('//')) links.add(href);
  expect(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0))).toBe(true);
  for (const raw of await page.locator('script[type="application/ld+json"]').allTextContents()) expect(()=>JSON.parse(raw)).not.toThrow();
 }
 expect(titles.size).toBe(8); expect(descriptions.size).toBe(8); expect(errors).toEqual([]);
 for (const href of links) expect((await request.get(base+href)).status(),href).toBe(200);
 for (const asset of ['/og-image.jpg','/favicon.png','/favicon.ico','/favicon.svg','/apple-touch-icon.png','/icon-192.png','/icon-512.png','/site.webmanifest','/robots.txt','/sitemap.xml']) expect((await request.get(base+asset)).status(),asset).toBe(200);
 const sitemap=await (await request.get(base+'/sitemap.xml')).text();expect((sitemap.match(/<loc>/g)||[]).length).toBe(8);
 expect(await (await request.get(base+'/robots.txt')).text()).toContain('https://nexaflow.com/sitemap.xml');
 const missing=await page.goto(base+'/not-a-real-page');expect(missing?.status()).toBe(404);await expect(page.locator('h1')).toHaveText('Page not found');await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, follow');
});
test('pricing, FAQ, keyboard, consent and mobile layouts',async({page})=>{
 const tracking:string[]=[];page.on('request',r=>{if(/google-analytics|googletagmanager/.test(r.url()))tracking.push(r.url())});
 await page.goto(base+'/pricing');await page.getByRole('button',{name:'Essential only'}).click();
 await page.getByRole('button',{name:'Yearly (save ~20%)'}).click();await expect(page.getByText('$180 per seat / year, billed annually')).toBeVisible();
 await page.getByRole('link',{name:'Ask about Pro'}).click();await expect(page.locator('#message')).toHaveValue("I'm interested in the pro plan. ");await expect(page.locator('#topic')).toHaveValue('sales');
 await page.goto(base+'/faq');await page.waitForLoadState('networkidle');const question=page.getByRole('button',{name:'What is NexaFlow?'});await question.focus();await page.keyboard.press('Enter');await expect(question).toHaveAttribute('aria-expanded','true');
 await page.getByRole('button',{name:'Cookie preferences'}).click();await page.getByRole('button',{name:'Accept analytics'}).click();expect(await page.evaluate(()=>localStorage.getItem('nexaflow.cookie-consent.v1'))).toBe('accepted');expect(tracking).toEqual([]);
 await page.reload();await expect(page.getByRole('dialog')).toHaveCount(0);await page.getByRole('button',{name:'Cookie preferences'}).click();await page.getByRole('button',{name:'Essential only'}).click();
 for(const width of [320,375,768,1440]) {
  await page.setViewportSize({width,height:900});
  for(const path of routes) {await page.goto(base+path);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width} ${path}`).toBe(true)}
 }
 await page.setViewportSize({width:375,height:812});await page.goto(base+'/');await page.waitForLoadState('networkidle');await page.getByRole('button',{name:'Open menu'}).click();await expect(page.getByRole('navigation',{name:'Mobile'})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('navigation',{name:'Mobile'})).toHaveCount(0);
 await page.emulateMedia({reducedMotion:'reduce'});expect(await page.locator('.rise').evaluate(el=>parseFloat(getComputedStyle(el).animationDuration))).toBeLessThan(.01);
 await page.screenshot({path:'/mnt/documents/nexaflow-mobile.png',fullPage:true});
});
test('contact validates, submits once and handles network errors',async({page})=>{
 await page.goto(base+'/contact');await page.getByRole('button',{name:'Essential only'}).click();await page.getByRole('button',{name:'Send message'}).click();await expect(page.locator('#name')).toBeFocused();await expect(page.locator('#name-error')).toBeVisible();
 await page.locator('#name').fill('NexaFlow QA');await page.locator('#email').fill('qa-nexaflow@example.com');await page.locator('#topic').selectOption('other');await page.locator('#message').fill('Automated QA submission: verifying private contact storage.');
 await page.route('**/*',route=>route.request().method()==='POST'?route.abort():route.continue());await page.getByRole('button',{name:'Send message'}).click();await expect(page.getByRole('alert')).toContainText("couldn't send");await page.unrouteAll();
 let posts=0;page.on('request',r=>{if(r.method()==='POST')posts++});await page.getByRole('button',{name:'Send message'}).dblclick();await expect(page.getByRole('heading',{name:'Message sent'})).toBeVisible();expect(posts).toBe(1);
});
