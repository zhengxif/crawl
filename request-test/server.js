let express = require('express');
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer({dest: 'upload'});
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/post', function(req, res) {
    let body = req.body;
    res.send(body);
});
app.post('/form', function(req, res) {
    let body = req.body;
    res.send(body);
});
app.post('/upload', upload.single('avatar'), function(req, res) {
    console.log(req.file); // 指的是请求体formData里的avatar字段对应的文件内容
    res.send(req.body);
})
app.listen(8080);