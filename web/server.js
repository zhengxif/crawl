const path = require('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const debug = require('debug')('crawl:web')
const CronJob = require('cron').CronJob
const { spawn } = require('child_process')
const query = require('../db')
const auth = require('./middleware/auth')
let app = express()

app.set('view engine', 'html')
app.set('views', path.resolve(__dirname, 'views'))
app.engine('html', require('ejs').__express)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret: 'zx', // 指定密钥
    resave: true, // 每次都要重新保存session
    saveUninitialized: true, // 保存未初始化的session
}))
app.use(async function(req, res, next) {
    res.locals.user = req.session.user;
    next();
})

app.get('/', async function(req, res) {
    let { tagId } = req.query;
    let tags = await query (`SELECT * from tags`);
    tagId = tagId || tags[0].id;
    let articles = await query(`SELECT articles.* FROM article_tag INNER JOIN articles ON article_tag.article_id = articles.id WHERE article_tag.tag_id = ?;`, [tagId])
    res.render('index', {
        tags,
        articles
    })
})
app.get('/detail/:id', async function(req, res) {
    let { id } = req.params;
    let articles = await query(`SELECT * FROM articles WHERE articles.id = ? LIMIT 1`, [id]);
    res.render('detail', {
        article: articles[0]
    })
})
app.get('/login', async function(req, res) {
    res.render('login', {
        title: '登陆'
    })
})
app.post('/login', async function(req, res) {
    let { email } = req.body;
    let users = await query(`SELECT * FROM users WHERE email = ? LIMIT 1`, [email]);
    let user;
    if (Array.isArray(users) && users.length > 0) {
        user = users[0];
    } else {
        let result = await query(`INSERT INTO users(email) VALUES(?)`, [email]);
        user = {
            id: result.insertId,
            email
        }
    }
    req.session.user = user;
    res.redirect('/');
})

app.get('/subscribe', auth, async function(req, res) {
    let tags = await query(`SELECT * FROM tags`);
    let user = req.session.user; // 拿到会话中的user属性
    let userTags = await query(`SELECT tag_id FROM user_tag WHERE user_id = ?`, [user.id]);
    let userTagIds = userTags.map(tag => tag.tag_id);
    tags.forEach(tag => {
        tag.checked = userTagIds.indexOf(tag.id) == -1 ? false : true;
    })
    res.render('subscribe', {
        title: '请订阅标签',
        tags
    })
})
app.post('/subscribe', auth, async function(req, res) {
    let { tags } = req.body;
    let user = req.session.user;
    // 先删除关联
    await query(`DELETE FROM user_tag WHERE user_id = ?`, [user.id]);
    // 再关联
    for (let i = 0; i < tags.length; i++) {
        await query(`INSERT INTO user_tag(user_id, tag_id) VALUES(?,?)`, [user.id, parseInt(tags[i])]);
    }
    res.redirect('back');
})

// 定时任务
let job = new CronJob('* * * */1 * *', function() {
    debug('开始执行更新的计划任务');
    let child = spawn(process.execPath, [path.resolve(__dirname, '../main.js')]);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on('close', function() {
        console.log('更新任务完毕');
    })
})
job.start()
app.listen(3000)


