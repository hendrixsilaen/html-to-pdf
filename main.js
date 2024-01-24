const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {

  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // using URL ==========
  // const website_url = 'https://www.bannerbear.com/blog/how-to-download-images-from-a-website-using-puppeteer/'; 
  // await page.goto(website_url, { waitUntil: 'networkidle0' });

  // using local HTML ==========
  const html = fs.readFileSync('sample.html', 'utf-8');
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

// Downlaod the PDF
  const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

  // Close the browser instance
  await browser.close();
})();