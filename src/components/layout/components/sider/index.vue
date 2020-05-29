<template>
    <div :class="['sider', {nano: collapsed}]">
        <div class="logo">
            <img src="/image/logo.png" v-show="collapsed">
            <span v-show="!collapsed">管理后台</span>
        </div>
        <a-menu
            mode="inline"
            theme="dark"
            :inline-collapsed="collapsed"
            :defaultOpenKeys="[activeMenu.pid]"
            :selectedKeys="[activeMenu.mid]"
            @click="handleClick"
            
        >
            <a-sub-menu v-for="menu in menus" :key="menu.id">
                <span slot="title">
                    <a-icon :type="menu.icon" />
                    <span v-text="menu.title"></span>
                </span>
                <a-menu-item v-for="item in menu.children" :key="item.url" v-text="item.title"></a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>
export default {
    name: "Sider",
    props: ['collapsed'],
    data() {
        return {
            activeMenu: {
                pid: null,
                mid: null,
            },
            menus: []
        };
    },
    created(){
        let menus = this.$store.getters.menus;
        this.menus.splice(0);
        menus.forEach(m => {
            this.menus.push(m);
        });

        let activeMenu = this.$store.getters.activeMenu;
        this.activeMenu.pid = activeMenu.pid;
        this.activeMenu.mid = '';
    },
    methods: {
        handleClick(e) {
            this.activeMenu.mid = e.keyPath[0];
            this.activeMenu.pid = e.keyPath[1];
            let title = e.domEvent.target.innerText;
            this.$emit('menuGo', {pid: this.activeMenu.pid, title: title, url: this.activeMenu.mid});
        },
        changeMenu(page){
            this.activeMenu.pid = page.pid;
            this.activeMenu.mid = page.url;
            this.$store.dispatch("ChooseMenu", this.activeMenu);
        }
    }
};
</script>

<style scoped>
.sider {
    width: 200px;
    color: rgba(255, 255, 255, 0.65);
}

.sider.nano{
    width: 80px;
}

.logo{
    text-align: center;
    border-bottom: 1px solid #000;
}

.logo img{
    height: 28px;
    margin: 10.5px 0;
}

.logo span{
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
    color: #fff;
    letter-spacing: 2px;
    user-select: none;
}

</style>