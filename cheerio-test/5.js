/**
 * 查找元素
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
// 查找元素 find children parent next nextAll prev prevAll eq

// 循环each
let fruits = [];
$('li').each(function(index,item) {
    fruits.push($(this).text());
})
console.log(fruits.join(','));

let lis = $('li').map(function(index, item) {  // 返回的是类数组
    return $(this).text();
})
console.log(Array.from(lis))

// append 在每个元素最后插入一个子元素 针对容器
// prepend 在每个元素最前插入一个子元素 针对容器
// after 在每个匹配元素之后插入一个元素 针对元素本身
// before 在每个匹配的元素之前插入一个元素 针对元素本身
// empty 清空
// text html 获取内容
// 。。。 类似jquery