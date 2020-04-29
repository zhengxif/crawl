const query = require('../db')
const debug = require('debug')('crawl:write:tags')

let tags = async function (tags) {
    debug('开始保存标签列表')
    try {
        for (let tag of tags) {
            let oldTag = await query(`SELECT * FROM tags WHERE name = ? LIMIT 1`, [tag.name])
            // 如果数据库里已经有记录了，则需要按老的记录ID来更新列表
            if (Array.isArray(oldTag) && oldTag.length > 0) { 
                await query(`UPDATE tags SET name=?, image=?, url=?, subscribe=?, article=? WHERE id=?`, [tag.name, tag.image, tag.url, tag.subscribe, tag.article, oldTag[0].id])
            } else {
                await query(`INSERT INTO tags(name, image, url, subscribe, article) VALUES(?,?,?,?,?)`, [tag.name, tag.image, tag.url, tag.subscribe, tag.article])
            }
            debug(`写入标签${tag.name}`)
        }
    } catch (error) {
        throw error
    }
    
}
module.exports = {
    tags
}