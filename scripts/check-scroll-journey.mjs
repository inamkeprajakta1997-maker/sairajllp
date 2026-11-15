import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
const scroll=async progress=>{await page.locator('.scroll-journey').evaluate((s,p)=>{const stage=s.querySelector('.journey-stage');scrollTo({top:s.getBoundingClientRect().top+scrollY-88+p*(s.offsetHeight-stage.offsetHeight),behavior:'instant'})},progress);await page.waitForTimeout(120);return page.locator('.journey-drawn').evaluate(n=>parseFloat(getComputedStyle(n).strokeDashoffset));};
const first=await scroll(.1);const middle=await scroll(.5);const last=await scroll(.9);const reverse=await scroll(.2);
if(!(first>middle&&middle>last&&reverse>last))throw Error('Path does not follow scroll in both directions');
await fs.mkdir('qa',{recursive:true});
for(const [i,p] of [.2,.47,.74].entries()){await scroll(p);await page.screenshot({path:`qa/journey-desktop-${i}.png`});}
await page.emulateMedia({reducedMotion:'reduce'});
if(await page.locator('.journey-stage').evaluate(n=>getComputedStyle(n).position)!=='relative')throw Error('Reduced motion must not pin content');
for(const card of await page.locator('.journey-card').all()){if(!await card.isVisible())throw Error('Reduced-motion content is hidden')}
await page.emulateMedia({reducedMotion:'no-preference'});
await page.setViewportSize({width:390,height:844});
await page.locator('.scroll-journey').scrollIntoViewIfNeeded();
if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile horizontal overflow');
for(const card of await page.locator('.journey-card').all()){if(!await card.isVisible())throw Error('Mobile card hidden')}
await page.locator('.scroll-journey').screenshot({path:'qa/journey-mobile.png'});
if(errors.length)throw Error(errors.join('\n'));
console.log('PASS: forward/reverse path progress, three cards, mobile layout, reduced-motion fallback; no browser errors.');
await browser.close();
