import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const base = "http://127.0.0.1:5173";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on('console', message=>{if(message.type()==='error' && /hydrat|uncaught|TypeError/i.test(message.text()))errors.push(message.text())});
await fs.mkdir("qa", { recursive: true });
await page.goto(base, { waitUntil: "networkidle" });
await page.locator("img").evaluateAll(async (images) => {
  await Promise.all(
    images.map(async (img) => {
      img.loading = "eager";
      await img.decode().catch(() => {});
    }),
  );
});
await page.screenshot({ path: "qa/home-desktop.png", fullPage: true });
const broken = await page
  .locator("img")
  .evaluateAll((images) =>
    images.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
  );
if (broken.length) throw Error("Broken images: " + broken.join(", "));
await page.getByRole("button", { name: "Next testimonial" }).click();
await page.getByText("Jayant Patole", { exact: true }).waitFor();
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
const paths = [...sitemap.matchAll(/<loc>https:\/\/sairajgroups.in([^<]*)<\/loc>/g)].map(
  (m) => m[1] || "/",
);
for (const path of paths) {
  const response = await page.goto(base + path, { waitUntil: "networkidle" });
  if (response.status() !== 200) throw Error(`${path}: ${response.status()}`);
  if ((await page.locator("h1").count()) !== 1) throw Error("Expected one h1 on " + path);
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  if (canonical !== "https://sairajgroups.in" + path)
    throw Error("Canonical mismatch " + path + " " + canonical);
  const invalid = await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images.map(async (i) => {
        i.loading = "eager";
        await i.decode().catch(() => {});
      }),
    );
    return images.filter((i) => i.naturalWidth === 0).map((i) => i.src);
  });
  if (invalid.length) throw Error("Broken image on " + path + ": " + invalid.join(", "));
}
await page.goto(base + "/inquiry");
await page.getByLabel("Your name").fill("Browser QA");
await page.getByLabel("Email address").fill("test@example.com");
await page.getByLabel("Phone number").fill("+919876543210");
await page.getByLabel("Service required").selectOption({ label: "Warehouse Rental Services" });
await page.getByLabel("Delivery city").fill("Pune");
await page.getByLabel("Shipment type").selectOption("Regular");
await page.getByRole("button", { name: "Prepare Inquiry" }).click();
await page.getByText("Your inquiry is ready to send.").waitFor();
const whatsapp = await page.getByRole("link", { name: "Send via WhatsApp" }).getAttribute("href");
if (!decodeURIComponent(whatsapp).includes("Delivery city: Pune"))
  throw Error("Inquiry payload lost destination");
await page.screenshot({ path: "qa/inquiry-desktop.png", fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
for (const path of [
  "/",
  "/services",
  "/services/warehouse-rental",
  "/about",
  "/contact",
  "/inquiry",
  "/blog",
  "/group-companies",
]) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  if (overflow) throw Error("Mobile horizontal overflow: " + path);
}
await page.goto(base, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Open navigation" }).click();
await page.getByRole("button", { name: "Show service menu" }).click();
await page
  .locator("#service-menu")
  .getByRole("link", { name: "Warehouse Rental Services" })
  .click();
await page.waitForURL("**/services/warehouse-rental");
await page.goto(base, { waitUntil: "networkidle" });
await page.locator("img").evaluateAll(async (images) => {
  await Promise.all(
    images.map(async (img) => {
      img.loading = "eager";
      await img.decode().catch(() => {});
    }),
  );
});
await page.screenshot({ path: "qa/home-mobile.png", fullPage: true });
const missing = await page.goto(base + "/this-page-does-not-exist");
if (missing.status() !== 404) throw Error("Expected 404, got " + missing.status());
await page.getByRole("heading", { name: "A different road ahead." }).waitFor();
if (errors.length) throw Error("Browser errors: " + errors.join("\n"));
await fs.writeFile(
  "qa/results.json",
  JSON.stringify(
    {
      pages: paths.length,
      desktop: "1440×1000",
      mobile: "390×844",
      forms: "validated email/WhatsApp handoff",
      navigation: "mobile services menu verified",
      notFound: 404,
      errors,
      brokenImages: broken,
    },
    null,
    2,
  ),
);
console.log(
  `PASS: ${paths.length} pages, SEO canonicals, desktop/mobile layouts, inquiry, navigation, testimonials and 404.`,
);
await browser.close();
