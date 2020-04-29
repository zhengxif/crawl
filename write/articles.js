const query = require('../db');
const debug = require('debug')('crawl:write:article');
let sendMail = require('../email');

let articles = async function (articles) {
    debug('开始写入博文')
    for (let article of articles) {
        try {
            let oldArticles = await query(`SELECT * FROM articles WHERE id = ? LIMIT 1`, [article.id])
            let isNew = false
            debug(`开始写入博文列表:${article.title}`)
            // 如果数据库里已经有记录了，则需要按老的记录ID来更新列表
            if (Array.isArray(oldArticles) && oldArticles.length > 0) { 
                let oldArticle = oldArticles[0]
                await query(`UPDATE articles SET title=?, content=?, href=? WHERE id=?`, [article.title, article.content, article.href, oldArticle.id])
            } else {
                await query(`INSERT INTO articles(id, title, content, href) VALUES(?,?,?,?)`, [article.id, article.title, article.content, article.href])
                isNew = true
            }
            // 根据文章id删除文章标签的关联数据
            await query(`DELETE FROM article_tag WHERE article_id = ? `,[article.id])
            // 文章内容对应的索引
            let where =  "('"+ article.tags.join("','") + "')"
            let sql = `SELECT id FROM tags WHERE name IN ${where}`
            let tagIds = await query(sql); 
            for (row of tagIds) {
                // 重新建立标签和内容的关系
                await query(`INSERT INTO article_tag(article_id, tag_id) VALUES(?,?)`, [article.id, row.id])
            }
            let tagIdsString =  "('"+ tagIds.map(item => item.id).join(',') + "')";
            if (isNew) {
                // 向订阅此标签用户发邮件
                let emailSql = `SELECT distinct users.email FROM user_tag INNER JOIN users ON user_tag.user_id = users.id WHERE tag_id IN ${tagIdsString}`
                let emails = await query(emailSql)
                for(let i = 0; i < emails.length; i++) {
                    debug(`开始发送邮件`, emails[i].email, article.title);
                    await sendMail(emails[i].email, '你订阅的文章更新了', `<a href="http://localhost:3000/detail/${article.id}">${article.title}</a>`)
                }
            }
        } catch (error) {
            console.log(error)
            continue
        }
    }
}
module.exports = {
    articles
}