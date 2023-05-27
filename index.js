const { chromium } = require("playwright");

const shops = [
  {
    vendor: "Microsoft",
    url: "https://www.xbox.com/es-es/configure/8WJ714N3RBTL",
    checkStock: async (page) => { //Cambió la función checkStock para recibir la página directamente en lugar de un objeto con propiedad de 'page'.
      const content = await page.textContent(
        '[aria-label="Finalizar la compra del pack"]'
      );
      return content.includes("Finalizar la compra");
    },
  },
];

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const pagePromises = [];

    for (const shop of shops) {
      const { checkStock, vendor, url } = shop;
      const pagePromise = browser.newPage().then(async (page) => {
        await page.goto(url);
        const hasStock = await checkStock(page);
        console.log(`${vendor}: ${hasStock ? "in stock!!!!" : "out of stock 😢"}`);
        await page.screenshot({ path: `screenshots/${vendor}.png` });
        await page.close();
      });
      pagePromises.push(pagePromise); //Envolvió la creación de cada página en una Promesa y las agregó a una matriz ("pagePromises").
    }

    await Promise.all(pagePromises); //Utilizó 'Promise.all' para esperar a que se completaran todas las promesas de la página antes de cerrar el navegador.
    await browser.close();
  } catch (error) {                 //Se movió el manejo de errores para cubrir todo el bloque de código asíncrono.
    console.error(error);
  }
})();

//Un scrapper es una técnica que se utiliza para abstraer info/data de una webpage