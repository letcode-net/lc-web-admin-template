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
    links: [
        {
            title: '权限',
            url: '/rbac/user',
            type: 'page'
            
        },
        {
            title: '对话框',
            url: '/rbac/user/dialog',
            type: 'dialog'
        },
    ],
    actions: {
        query: true,
        create: true,
        update: true,
        delete: true
    }
}

// 列表查询
export function loadList(params) {
    console.log('加载用户列表', meta.url.base, params);
    //return request.get(url.base, params);

    let result = {
        "status": {
            "code": 0,
            "message": "请求成功"
        },
        "data": {
            "columns": [
                {
                    "title": "序号",
                    "dataIndex": "id"
                },
                {
                    "title": "用户名",
                    "dataIndex": "username"
                },
                {
                    "title": "昵称",
                    "dataIndex": "nickname"
                },
                {
                    "title": "邮箱",
                    "dataIndex": "email"
                },
                {
                    "title": "状态",
                    "dataIndex": "status"
                }
            ],
            "query": {
                "search": "",
                "sort": "id_ASC"
            },
            "searchFields": {
                "username": "用户名",
                "nickname": "昵称"
            },
            "page": {
                "pageNo": 1,
                "pageSize": 10,
                "pageTotal": 1,
                "first": 1,
                "last": 2,
                "size": 2,
                "rows": 2
            },
            "list": [
                {
                    "id": 1,
                    "username": "admin",
                    "nickname": "管理员",
                    "avatar": null,
                    "email": "code@letcode.net",
                    "status": 1,
                    "groups": []
                },
                {
                    "id": 2,
                    "username": "test",
                    "nickname": "测试用户",
                    "avatar": null,
                    "email": "test@letcode.net",
                    "status": 1,
                    "groups": []
                }
            ]
        }
    };

    return result;
}

// 列表数据操作
export function listAction(e){
    if (e.status == 1) {
        e.status = "启用";
    } else if (e.status == 0) {
        e.status = "停用";
    }
}