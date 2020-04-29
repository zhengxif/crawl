let request = require('request')
let iconvLite = require('iconv-lite')
let cheerio = require('cheerio')
request({
    url: 'http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1',
    encoding: null // 告诉request模块不需要把响应体的buffer二进制转换成字符串
}, function(err, respones, body) {
    if (err) console.error(err)
    // 把一个gbk的buffer转换成一个utf8字符串
    body = iconvLite.decode(body, 'gbk').toString()
    let $ = cheerio.load(body)
    let movies = []
    $('.keyword .list-title').each((index, item) => {
        let movie = $(item)
        movies.push({
            name: movie.text()
        })
    })
    console.log(movies)
})