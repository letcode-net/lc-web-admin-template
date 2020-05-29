<template>
    <div>
        <keep-alive>
            <router-view @goPage="goPage" @closeAndGo="closeAndGo" :key="key" />
        </keep-alive>
        <!-- 带切换动画效果的 -->
        <!-- <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
        </transition>-->
    </div>
</template>

<script>
export default {
    name: "Main",
    data() {
        return {};
    },
    computed: {
        // cachedViews() {
        //     return this.$store.state.tagsView.cachedViews;
        // },
        key() {
            return this.$route.path;
        }
    },
    methods: {
        goPage(page) {
            this.$emit("goPage", page);
        },
        closeAndGo(params) {
            this.$emit("closeAndGo", params);
        }
    }
};
</script>

<style scoped>
/* fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.3s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
    transition: all 0.3s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
}

.breadcrumb-move {
    transition: all 0.3s;
}

.breadcrumb-leave-active {
    position: absolute;
}
</style>