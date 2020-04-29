let read = require('./read');
let write = require('./write');
let tagUrl = 'https://juejin.im/subscribe/all';

(async function() {
    try {
        // 读取掘金的标签列表
        let tags = await read.tags(tagUrl)
        // 把标签写到数据库中
        await write.tags(tags)
        let allArticles = {}
        // // 标签有很多， 不同的标签下面的文章可能会重复
        for (tag of tags) {
            let articles = await read.articles(tag.url)
            articles.forEach(article => allArticles[article.id] = article)
        }
        await write.articles(Object.values(allArticles))
        process.exit()
    } catch (error) {
        console.log(error)
    }
})()

process.on('uncaughtException',function (err) {
    console.error('uncaughtException: %s',erro.stack);
});