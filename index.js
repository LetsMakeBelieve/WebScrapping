const { chromium } = require("playwright");

const shops = [
  {
    vendor: "Microsoft",
    url: "https://www.xbox.com/es-es/configure/8WJ714N3RBTL",
    checkStock: async ({ page }) => {
      await page.screenshot({ path: "example.png" });
      const content = await page.textContent(
        '[aria-label="Finalizar la compra del pack"]'
      );
      return  content.includes("Finalizar la compra") === true;
    },
  },
];

 (async () => {
  const browser = await chromium.launch();

    for (const shop of shops) {
        const {checkStock, vendor, url} = shop
        const page = await browser.newPage();
        await page.goto(url);
        const hasStock = await checkStock({page})
        console.log(`${vendor}: ${hasStock ? 'in stock!!!!' : 'out of stock 😢'}`)
    }

  await browser.close();
})();

//Un scrapper es una técnica que se utiliza para abstraer info/data de una webpage
