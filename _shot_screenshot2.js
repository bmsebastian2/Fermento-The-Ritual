const puppeteer = require("puppeteer-core");
const path = require("path");
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR =
  "C:\\Users\\SEBAST~1\\AppData\\Local\\Temp\\claude\\c--Users-Sebastian-Documents-Web-Fermento\\254621ed-b1e6-4e6a-b33b-5f853f278df2\\scratchpad";

async function shoot(width, label) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width, height: 1200 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 80);
    });
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 600));
  const el = await page.$("#cat-shots");
  await el.scrollIntoView();
  await new Promise((r) => setTimeout(r, 600));
  await el.screenshot({ path: path.join(OUT_DIR, `shots3-${label}.png`) });

  const data = await page.evaluate(() => {
    const articles = document.querySelectorAll("#cat-shots article");
    return Array.from(articles).map((art) => {
      const imgs = art.querySelectorAll("img");
      const bottleImg = imgs[imgs.length - 1];
      const rect = bottleImg.getBoundingClientRect();
      return {
        name: art.querySelector("h4")?.textContent,
        renderedW: Math.round(rect.width),
        renderedH: Math.round(rect.height),
      };
    });
  });
  console.log(`width=${width}`, JSON.stringify(data));

  await browser.close();
  console.log("done", label);
}

(async () => {
  await shoot(1440, "desktop");
  await shoot(768, "tablet");
  await shoot(375, "mobile");
})();
