const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});//打开浏览器
    const page = await browser.newPage();//打开一个空白页
    await page.goto('https://www.baidu.com');//在地址栏输入网址并等待加载
    await page.screenshot({ path: 'baidu.png' });//截个图
    await browser.close();//关掉浏览器
})();