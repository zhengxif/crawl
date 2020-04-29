const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    service: 'qq', // 邮件服务器
    port: 465,
    secureConnection: true, // 使用了ssl 加密传输服务
    auth: { // 权限认证
        user: '1852909601@qq.com',
        // 这个不是密码 而是smtp授权码
        pass: 'yavdmuvoycwcbaba'
    }
})
async function sendMail(to, subject, html) {
    let mailOptions = {
        from: '"zhengxi" <1852909601@qq.com>',
        to,
        subject,
        html
    }
    await transporter.sendMail(mailOptions)
}
module.exports = sendMail