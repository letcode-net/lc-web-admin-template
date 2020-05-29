<template>
    <div class="m-box">
        <div class="m-header">
            <span>
                <a-icon type="form" />
            </span>
            <span>编辑用户</span>
        </div>
        <div class="m-body">
            <div class="m-form">
                <a-form-model
                    ref="ruleForm"
                    :model="form"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <a-form-model-item prop="nickname" label="用户昵称">
                        <a-input v-model="form.nickname" />
                    </a-form-model-item>

                    <a-form-model-item prop="username" label="登录账号">
                        <a-input v-model="form.username" :disabled="bid != undefined" />
                    </a-form-model-item>

                    <a-form-model-item label="登录密码" v-if="bid">
                        <a-input
                            v-model="form.password"
                            type="password"
                            autocomplete="off"
                            placeholder="留空代表不修改密码"
                        />
                    </a-form-model-item>

                    <a-form-model-item prop="password" label="登录密码" v-else>
                        <a-input v-model="form.password" type="password" autocomplete="off" />
                    </a-form-model-item>

                    <a-form-model-item prop="email" label="电子邮箱">
                        <a-input v-model="form.email" />
                    </a-form-model-item>

                    <a-form-model-item :wrapper-col="{ span: 22, offset: 2 }">
                        <a-button type="primary" @click="onSubmit" v-if="bid">更新{{module.title}}</a-button>
                        <a-button type="primary" @click="onSubmit" v-else>创建{{module.title}}</a-button>
                    </a-form-model-item>
                </a-form-model>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserForm",
    props: ["bid"],
    computed: {
        // 当前功能模块信息
        module() {
            return this.$api["rbac"]["user"];
        }
    },
    data() {
        return {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
            form: {
                id: null,
                username: '',
                nickname: '',
                password: '',
                email: '',
                groups: [],
                groupItems: []
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 32,
                        message: "用户名为3 ~ 32位的字符",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 32,
                        message: "密码为3 ~ 32位的字符",
                        trigger: "blur"
                    }
                ],
                nickname: [
                    {
                        required: true,
                        message: "请输入昵称",
                        trigger: "blur"
                    }
                ],
            }
        }
    },
    methods: {
        onSubmit(){
            this.closePage();
        },
        closePage() {
            let params = {
                current: this.$router.history.current.path,
                page: {
                    title: '用户管理',
                    url: this.module.meta.view.list
                }
            };

            this.$emit("closeAndGo", params);
        }
    }
};
</script>

<style scoped>
</style>