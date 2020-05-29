<template>
    <div class="home" ref="home">
        <!-- 侧边栏 -->
        <div class="sider" ref="sider">
            <Sider :collapsed="collapsed" @menuGo="menuGo" ref="siderMenus"></Sider>
        </div>
        <div class="wrap">
            <!-- 顶部菜单 -->
            <div class="header">
                <Header @collapse="collapseSider" @changeMenu="changeMenu" ref="header"></Header>
            </div>

            <!-- 主体区域 -->
            <div class="main-wrap">
                <div class="main">
                    <Main @goPage="goPage" @closeAndGo="closeAndGo"></Main>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sider from './components/sider';
import Header from './components/header';
import Main from './components/main';

export default {
    name: 'Home',
    components: {
        Sider, Header, Main
    },
    data() {
        return {
            collapsed: false
        }
    },
    methods: {
        collapseSider(){
            let home = this.$refs.home;
            let sider = this.$refs.sider;
            if(this.collapsed){
                home.style.paddingLeft = '200px';
                sider.style.width = '200px';
            }else{
                home.style.paddingLeft = '80px';
                sider.style.width = '80px';
            }
            this.collapsed = !this.collapsed;
        },
        menuGo(page){
            this.$refs.header.menuGo(page);
        },
        goPage(page){
            this.$refs.header.goPage(page);
        },
        closeAndGo(page){
            this.$refs.header.closeAndGo(page);
        },
        changeMenu(page){
            this.$refs.siderMenus.changeMenu(page);
        }
    }
};
</script>

<style scoped>
.home{
    width: 100%;
    height: 100%;
    position: relative;
    padding-left: 200px;
    background-color: #f0f2f5;
    transition: padding 0.2s;
}

.sider{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 200px;
    overflow-y: auto;
    box-sizing: border-box;
    transition: width 0.2s;
    background-color: #001529;
}

.wrap{
    height: 100%;
    width: 100%;
    padding-top: 102px;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
}

.header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 92px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 0 4px rgba(100, 100, 100, 0.1);
}

.main-wrap{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 10px 15px;
}

.main{
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #fff;
}

</style>