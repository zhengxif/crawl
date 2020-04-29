// 向服务器发送post请求 请求体是表单格式 application/x-www-urlencoded
const request = require('request');

let options = {
    url: 'http://localhost:8080/form',
    method: 'post',
    json: true,
    headers: {
        "Content-Type": 'application/x-www-urlencoded'
    },
    form: { name: 'zx', age: 30 }, // 请求体放在form里
}
request(options, function(err, response, body) {
    console.log(err);
    console.log(body);

});