// 向服务器发送post请求
const request = require('request');

let options = {
    url: 'http://localhost:8080/post',
    method: 'post',
    json: true,
    headers: {
        "Content-Type": 'application/json'
    },
    body: { name: 'zx', age: 20 }
}
request(options, function(err, response, body) {
    console.log(err);
    console.log(body);

});