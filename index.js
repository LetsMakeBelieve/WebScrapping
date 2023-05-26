const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.goto('https://www.xbox.com/es-es/configure/8WJ714N3RBTL')
    await page.screenshot({ path: 'example.png' })
    const content = await page.textContent('[aria-label="Finalizar la compra del pack"]')
    console.log(content.includes('Finalizar la compra'))
    await browser.close()
})()