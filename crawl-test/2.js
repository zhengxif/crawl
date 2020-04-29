/**
 * 简单的服务端渲染，可以正则提取
 */
let request = require('request'); // 封装了http.request方法
let url = 'https://juejin.im/tag/%E5%89%8D%E7%AB%AF';
let fs = require('fs');

// request(url, function (err, response, body) {
//     console.log(err);
//     console.log(response.statusCode);
//     console.log(body);
//     fs.writeFileSync('tag.html', body);
// })
request(url, function (err, response, body) {
    let regexp = /class="title" data-v-\w+>(.+?)<\/a>/g;
    let titles = [];
    body.replace(regexp, (matched, title) => {
        titles.push(title);
    })
    console.log(titles);
})