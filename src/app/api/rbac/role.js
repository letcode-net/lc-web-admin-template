// import request from '@/utils/request'

// 数据接口
const url = {
    base: "/admin/erp/rbac/role"
}

// 登录方法
export function list(params) {
    console.log('加载角色列表', url.base, params);
    //return request.get(url.base, params);

    return {title: '测试数据'};
}