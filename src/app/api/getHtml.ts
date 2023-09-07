import puppeteer from 'puppeteer'

import puppeteerConfig from '../../../puppeteer.rc.cjs';
export const getHtml = async (url:string) => {;
  // Launch the browser an open a new blank page
  const browser = await puppeteer.launch(puppeteerConfig);
  const page = await browser.newPage();
  

  await page.goto(url, { waitUntil: "networkidle0" });

  const imgEl = await page.$(
    "main > div > div > article > div > div > div > div > div > div > img"
  )

  const imageUrl = await page.evaluate((img) => img?.src, imgEl)
  await browser.close();
  return {imageUrl, hashtags:"#13.7챌린지"}
}

