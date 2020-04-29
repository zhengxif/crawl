const debug = require('debug')('crawl:read:article')
const cheerio = require('cheerio')
const request = require('request-promise')
module.exports =  function readArticle(id, url) {
    debug('读取博文')
    let options = {
        url,
        transform: function (body) {
            return cheerio.load(body)
        }
    }
    return request(options).then( $ => {
        let article = $('.main-container')
        let title = article.find('h1.article-title').text().trim()
        let content = article.find('.article-content').html()
        let tags = article.find('.tag-list-box > div.tag-list > a.item')
        tags = tags.map((index, item) => {
            let href = $(item).attr('href')
            return href ? decodeURIComponent(href.slice(5)) : href
        })
        tags = Array.prototype.slice.call(tags);
        debug('读取文章详情')
        return {
            id,
            title,
            content,
            tags
        }
    }).catch( err => {
        debug('文章详情未找到')
        return null
    })
}