// 向服务器提交文件，类型是 multipart/form-data
const request = require('request');
const fs = require('fs');
let url= 'http://localhost:8080/upload';
let formData = {
    name: 'zx',
    age: '10',
    avatar: { // 文件类型
        value: fs.createReadStream('avatar.png'), // 可读流存放头像的内容字节
        options: {
            filename: 'avator.png',
            contentType: 'image/png'
        }
    }
}
request.post({url, formData}, (err, response, body) => {
    console.log(err);
    console.log(body);
})
