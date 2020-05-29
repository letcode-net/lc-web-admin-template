<template>
    <div>
        <div class="top-bar">
            <div class="collapse" @click="collapse">
                <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"></a-icon>
            </div>
            <div class="search-box">
                <a-icon type="search" />
                <input type="text" placeholder="搜索" />
            </div>

            <div class="top-right">
                <ul class="sys-menus">
                    <li>
                        <a @click="e => e.preventDefault()">
                            <a-icon type="book" /> 使用帮助
                        </a>
                    </li>
                    <li>
                        <a @click="e => e.preventDefault()">
                            <a-icon type="mail" /> 联系我们
                        </a>
                    </li>
                </ul>
                <div class="user-menus">
                    <a-dropdown>
                        <a class="ant-dropdown-link user-info" @click="e => e.preventDefault()">
                            <a-icon type="user" />
                            <span>{{ $store.state.user.username }}</span>
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <div><a-icon type="info-circle" /> 用户资料</div>
                            </a-menu-item>
                            <a-menu-item>
                                <div @click="logout"><a-icon type="logout" /> 退出登录</div>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                    
                </div>
            </div>
        </div>
        <div class="page-tags">
            <PageTags
                :tags="pageTags"
                :current="currentPage"
                @changePage="changePage"
                @closePage="closePage"
            ></PageTags>
        </div>
    </div>
</template>

<script>
import PageTags from "./PageTags";
export default {
    name: "Header",
    components: {
        PageTags
    },
    data() {
        return {
            collapsed: false,
            pageTags: [
                {
                    title: "首页",
                    url: "/index",
                    fixed: true
                }
            ],
            currentPage: "/index"
        };
    },
    mounted(){
        let path = this.$router.history.current.path;
        // 当前页面不是首页
        if(path != this.currentPage){
            let menus = this.$store.getters.menus;
            let menu;
            for(let parent of  menus){
                for(let m of parent.children){
                    if(m.url == path){
                        menu = m;
                        break;
                    }
                }
                if(menu){
                    break;
                }
            }
            if(menu){
                this.pageTags.push(
                    {
                        title: menu.title,
                        url: menu.url
                    }
                );
            }
            this.currentPage = path;
        }
        
    },
    methods: {
        collapse() {
            this.collapsed = !this.collapsed;
            this.$emit("collapse");
        },
        menuGo(page) {
            let exist = false;

            // 判断是否已存在
            for (let i in this.pageTags) {
                if (this.pageTags[i].url == page.url) {
                    exist = true;
                    break;
                }
            }

            // 不存在时添加
            if (!exist) {
                this.pageTags.push(page);
            }

            // 更新页面
            this.currentPage = page.url;
            this.$router.push(page.url);
        },
        goPage(page) {
            let exist = false;

            // 判断是否已存在
            for (let i in this.pageTags) {
                if (this.pageTags[i].url == page.url) {
                    exist = true;
                    break;
                }
            }

            // 不存在时添加
            if (!exist) {
                this.pageTags.push(page);
            }

            // 设置选中
            this.changePage(page);
        },
        changePage(page) {
            let ok = false;
            if (this.currentPage != page.url) {
                this.currentPage = page.url;
                this.$router.push(page.url);

                // 更新左侧菜单
                if(page.pid){
                    this.$emit('changeMenu', page);
                }
                ok = true;
            }
            return ok;
        },
        closePage(url) {
            for (let i in this.pageTags) {
                if (this.pageTags[i].url == url) {
                    this.pageTags.splice(i, 1);
                    break;
                }
            }
        },
        closeAndGo(params){
            this.closePage(params.current);
            let page = params.page;
            let exist = false;
            for(let tag of this.pageTags){
                if(tag.url == page.url){
                    exist = true;
                    break;
                }
            }
            
            if(!exist){
                this.pageTags.push(page);
            }
            this.changePage(page);
        },
        logout(){
            // 清理用户信息
            this.$store.dispatch("LogOut");
            // 跳转登录页面
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.top-bar {
    height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid #eee;
}

.collapse {
    display: inline-block;
    vertical-align: middle;
    line-height: 50px;
    font-size: 18px;
    margin-right: 20px;
}

.collapse:hover {
    color: #1890ff;
}

.search-box {
    display: inline-block;
    vertical-align: middle;
    color: #999;
}

.search-box i {
    font-size: 13px;
    margin-right: 5px;
}

.search-box input {
    border: none;
    outline: none;
    width: 200px;
    font-size: 13px;
}

.top-right {
    float: right;
    margin-right: 40px;
}

.sys-menus{
    display: inline-block;
    list-style-type: none;
    margin: 0;
}

.sys-menus li{
    display: inline-block;
    padding: 0 15px;
    line-height: 48px;
    border-top: 2px solid #fff;
}

.sys-menus li a{
    color: #777;
}

.sys-menus li.active,
.sys-menus li:hover{
    border-top: 2px solid #1890ff;
}

.sys-menus li.active a,
.sys-menus li:hover a{
    color: #1890ff;
}

.user-menus{
    display: inline-block;
    line-height: 50px;
    margin-left: 40px;
}

.user-info{
    color: #777;
}

.user-info i{
    margin-right: 5px;
}

.page-tags {
    height: 42px;
    line-height: 42px;
    width: 100%;
    padding: 0 15px;
    overflow-x: hidden;
    box-sizing: border-box;
}
</style>