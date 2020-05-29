/** 数据操作接口配置 */

// 导出
export default {
    login: require('./login'),
    rbac: {
        user: require('./rbac/user'),
        role: require('./rbac/role')
    }
}

