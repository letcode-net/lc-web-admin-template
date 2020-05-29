/** 路由配置 */
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/components/layout/";

Vue.use(VueRouter);

// 公共路由
export const constantRoutes = [
    { 
        path: "/", 
        redirect: '/login',
    },
    { 
        path: "/login", 
        component: (resolve) => require(['@/components/views/commons/login'], resolve)
    },
    { 
        path: "", 
        component: Layout,
        children: [
            {
                path: 'index',
                component: (resolve) => require(['@/components/views/dashboard'], resolve)
            },
            {
                path: 'list/:package/:domain',
                props: true,
                component: (resolve) => require(['@/components/views/commons/list'], resolve)
            },
            {
                path: '/rbac/user/:bid?',
                props: true,
                component: (resolve) => require(['@/components/views/rbac/user/Form'], resolve)
            }
        ]
    }
];

// 路由对象
export default new VueRouter({
    // mode: 'history', // 去掉url中的#
    routes: constantRoutes
});
