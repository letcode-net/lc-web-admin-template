<template>
    <a-config-provider :locale="locale" :getPopupContainer="getPopupContainer">
        <div id="app">
            <router-view></router-view>
        </div>
    </a-config-provider>
</template>

<script>

// 全局国际化
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default {
    name: "App",
    data(){
        return {
            locale: zhCN
        }
    },
    created () {
        // 防止页面刷新导致数据丢失，这里先同步本地缓存
        this.$store.dispatch("LoadSessionStorage");
    },
    methods: {
        getPopupContainer(el, dialogContext) {
            if (dialogContext) {
                return dialogContext.getDialogWrap();
            } else {
                return document.body;
            }
        }
    }
};
</script>