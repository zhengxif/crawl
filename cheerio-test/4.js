/**
 * 属性操作prop
 */

const cheerio = require('cheerio');
const html = `
   <input type="checkbox" checked />
   <div data-apple-color="red" data-apple-price="10">苹果</div>
   <input type="text" name="username" value="123" class="user" />
`;
let $ = cheerio.load(html);
console.log($('input[type="checkbox"]').prop('checked'));
console.log($('div').data());
console.log($('div').data('apple-color'));
$('div').data('apple-color', 'green');
console.log($('div').data('apple-color'));
console.log($('input[name="username"]').val());
console.log($('input[name="username"]').hasClass('user')); // addClass removeClass

