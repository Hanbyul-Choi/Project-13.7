import puppeteer from 'puppeteer'
export const getHtml = async (url:string) => {;
  // Launch the browser an open a new blank page
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  

  await page.goto(url, { waitUntil: "networkidle0" });

  const imgEl = await page.$(
    "main > div > div > article > div > div > div > div > div > div > img"
  )

  const imageUrl = await page.evaluate((img) => img?.src, imgEl)
  await browser.close();
  return imageUrl
}

