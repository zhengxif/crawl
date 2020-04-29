let cheerio = require('cheerio')
let debug = require('debug')('crawl:read:tags')
let request = require('request-promise')
exports.tags = function(url) {
    debug('读取文章标签列表')
    let options = {
        url,
        transform: function(body) {
            return cheerio.load(body)
        }
    }
    return request(options).then( $ => {
       
        let tags = []
        $('.item').each((i, item) => {
            let tag = $(item)
            let image = tag.find('div.thumb').first()
            let title = tag.find('.title').first()
            let subscribe = tag.find('.subscribe').first()
            let article = tag.find('.article').first()
            let name = title.text().trim()
            tags.push({
                image: image.data('src').trim(),
                name,
                url: `https://juejin.im/tag/${encodeURIComponent(title.text().trim())}`,
                subscribe: Number(subscribe.text().match(/(\d+)/)[1]),
                article: Number(article.text().match(/(\d+)/)[1])
            })
            debug(`读取文章标签:${name}`)
        })
        return tags
    })
}