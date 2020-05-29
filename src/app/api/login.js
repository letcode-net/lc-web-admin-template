import request from '@/utils/request'

// 数据接口
const url = {
    login: "/admin/erp/auth/login",
    info: "/admin/erp/auth/login",
    imageCode: "/api/open/captcha/image",
    checkCode: "/api/open/captcha/image/check",
    success: '/index'
}

// 登录方法
export function login(user) {
    //return request.post(url.login, user);

    // 模拟的返回数据
    console.log(user);
    let result = {
        "status": {
            "code": 0,
            "message": "请求成功"
        },
        "data": {
            "user": {
                "id": 1,
                "username": "admin"
            },
            "token": "btzv76y69b6vwzebz53s5wgqz1ki0ttv",
            "menus": [
                {
                    "id": 1,
                    "title": "系统安全",
                    "code": "rbac",
                    "icon": "fire",
                    "url": null,
                    "children": [
                        {
                            "id": 2,
                            "title": "用户管理",
                            "code": "rbac_admin",
                            "icon": null,
                            "url": "/list/rbac/user",
                            "children": null
                        },
                        {
                            "id": 3,
                            "title": "用户分组",
                            "code": "rbac_user_group",
                            "icon": null,
                            "url": "/list/rbac/group",
                            "children": null
                        },
                        {
                            "id": 4,
                            "title": "角色管理",
                            "code": "rbac_role",
                            "icon": null,
                            "url": "/list/rbac/role",
                            "children": null
                        },
                        {
                            "id": 5,
                            "title": "权限管理",
                            "code": "rbac_permission",
                            "icon": null,
                            "url": "/list/rbac/permission",
                            "children": null
                        },
                        {
                            "id": 6,
                            "title": "资源管理",
                            "code": "rbac_resource",
                            "icon": null,
                            "url": "/list/rbac/resource",
                            "children": null
                        },
                        {
                            "id": 7,
                            "title": "菜单管理",
                            "code": "rbac_menu",
                            "icon": null,
                            "url": "/list/rbac/menu",
                            "children": null
                        }
                    ]
                },
                {
                    "id": 16,
                    "title": "系统配置",
                    "code": "sys",
                    "icon": "setting",
                    "url": "",
                    "children": [
                        {
                            "id": 18,
                            "title": "系统日志",
                            "code": "sys_log",
                            "icon": "",
                            "url": "/list/sys/log",
                            "children": null
                        },
                        {
                            "id": 19,
                            "title": "系统配置",
                            "code": "sys_profile",
                            "icon": "",
                            "url": "/list/sys/profile",
                            "children": null
                        }
                    ]
                }
            ]
        }
    };
    return result;
}

// 登录成功，转至首页
export function goHome(router) {
    router.push(url.success)
}

// 获取用户详细信息
export function getInfo() {
    return request.post(url.info);
}

// 退出方法
export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

// 获取验证码
export function getCodeImg() {
    return request({
        url: '/captchaImage',
        method: 'get'
    })
}