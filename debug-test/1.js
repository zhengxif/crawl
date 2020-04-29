let debug = require('debug')
let logger = debug('logger:test')
let logger = debug('logger:test1')

// 先判断当前的运行环境，查看环境变量中的DEBUG的值，看值是否跟自己的名字匹配， 如果匹配则输出日志
// DEBUG=logger:* node 1.js    
// MAC export DEBUG=app:*
// Window SET DEBUG=app:*
logger('打印日志')
