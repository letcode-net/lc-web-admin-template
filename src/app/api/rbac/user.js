// import request from '@/utils/request'

// 数据接口
export const meta = {
    title: '用户',
    sort: "id_ASC",
    url: {
        base: "/admin/erp/rbac/user",
        grous: "/admin/erp/rbac/group/load"
    },
    view: {
        list: "/list/rbac/user",
        form: "/rbac/user"
    },
    action: {
        query: true,
        create: true,
        update: true,
        delete: true,
        extend: true,
        more: []
    }
}

// 列表查询
export function list(params) {
    console.log('加载用户列表', meta.url.base, params);
    //return request.get(url.base, params);

    return {title: '测试数据'};
}

