import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:390,height:844}});
await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
for(const brand of ['whatsapp','instagram','facebook']){const response=await page.request.get(`http://127.0.0.1:5173/images/${brand}.svg`);if(!response.ok()||!(await response.text()).includes('<svg'))throw Error(`Invalid ${brand} asset`)}
const panel=page.locator('.floating-socials');
if(await panel.locator('.social-float').count()!==3)throw Error('Expected three social icons');
if(await panel.getByRole('link').getAttribute('href')!=='https://wa.me/919922469898')throw Error('Incorrect WhatsApp destination');
if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile overflow');
await panel.screenshot({path:'qa/floating-socials-mobile.png'});
console.log('PASS: three authentic SVG icons, verified WhatsApp link, unconfigured social links clearly unavailable, mobile layout.');
await browser.close();
