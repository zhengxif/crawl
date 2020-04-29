/**
 * 复杂页面可以用puppeteer
 */
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://baidu.com');
    await page.screenshot({
        path: 'baidu.png'
    });
    await page.goto('https://juejin.im/welcome/frontend', {
        waitUntil: 'networkidle2'
    });
    // 获取指定节点的属性 $ document.querySelector() $$ 代表document.querySelectorAll
    const titles = await page.$$eval('a.title', elements => {
        return elements.map(item => item.innerText);
    })
    console.log(titles);
    await browser.close();
})();