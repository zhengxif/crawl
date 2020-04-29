let cheerio = require('cheerio')
let debug = require('debug')('crawl:read:articleList')
let request = require('request-promise')
let readArticle = require('./readArticle')

exports.articles = async function(url) {
    debug('开始读取博文列表')
    let options = {
        url,
        transform: function(body) {
            return cheerio.load(body)
        }
    }
    return request(options).then(async $ => {
        let articleList = []
        let items = $('.item .title')
        for(let i = 0; i < items.length; i++) {
            let article = $(items[i])
            let href = article.attr('href').trim()
            let title = article.text().trim()
            let id = href.match(/\/(\w+)$/)[1]
            href = 'https://juejin.im' + href
            debug(`读取博文列表:${title}`)
            let articleDetail = await readArticle(id, href)
            articleDetail && articleList.push({
                href,
                title,
                id,
                content: articleDetail.content,
                tags: articleDetail.tags 
            })
        }
        return articleList
    })
}