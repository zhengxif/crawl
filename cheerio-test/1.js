const cheerio = require('cheerio');

let html = `
    <h2 class="title">Hello World</h2>
`;
const $ = cheerio.load(html);
$('h2.title').text('Hello zx');
$('h2').addClass('welcome');
console.log($.html());