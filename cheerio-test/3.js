/**
 * 属性操作attr
 */

const cheerio = require('cheerio');
const html = `
    <ul id="fruits">
        <li class="apple">苹果</li>
        <li class="banana">香蕉</li>
        <li class="pear">梨</li>
    </ul>
`;
let $ = cheerio.load(html);
console.log($('ul').attr('id'));
$('ul').attr('id', 'favorite').attr('class', 'favorite');
console.log($('ul').attr('id'), $('ul').attr('class'));
$('ul').removeAttr('class');
console.log($('ul').attr('class'));