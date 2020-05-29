const name = 'LetCode管理后台' // 标题

const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // 基本路径
    publicPath: './',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}