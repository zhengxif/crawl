// 监听位置错误 uncaughtException
function go() {
    try {
        setTimeout(function() {
            console.log(a)
        }, 3000)
    } catch (error) {
        console.log(error)
    }
}
go()
setTimeout(function() {
    console.log('after go')
}, 1000)

// 可以捕获那些没有try catch的异步捕获之后则系统将不会退出  （不推荐）
process.on('uncaughtException', function(err) {
    console.log(err.stack)
})