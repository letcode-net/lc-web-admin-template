<template>
    <div>
        <component :is="componentName"></component>
    </div>
</template>

<script>
export default {
    name: "Dialog",
    props: ["componentName", "params"],
    components: {
        UserForm: (resolve) => require(['@/components/views/rbac/user/Form'], resolve)
    },
    mounted() {
    },
    data() {
        return {
        };
    }
};
</script>

<style scoped>
</style>