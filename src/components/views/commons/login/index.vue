<template>
    <div class="form-wrap">
        <div class="bg"></div>
        <div class="login-form">
            <div class="form-title">
                <img src="/image/logo.png" alt />
                <span>管理系统</span>
            </div>
            <a-form-model ref="ruleForm" :model="user" :rules="rules">
                <a-form-model-item prop="username">
                    <a-input ref="username" v-model="user.username" placeholder="用户名">
                        <a-icon slot="prefix" type="user" />
                    </a-input>
                </a-form-model-item>

                <a-form-model-item prop="password">
                    <a-input
                        v-model="user.password"
                        type="password"
                        placeholder="密码"
                        autocomplete="off"
                    >
                        <a-icon slot="prefix" type="lock" />
                    </a-input>
                </a-form-model-item>

                <a-form-model-item class="action">
                    <a-button type="primary" @click="onSubmit">登录</a-button>
                </a-form-model-item>
            </a-form-model>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    computed: {
        serverApi() {
            return this.$api.login;
        }
    },
    data() {
        return {
            imageCode: {
                token: "",
                image: ""
            },
            user: {
                username: "",
                password: "",
                code: ""
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
                imageCode: [
                    {
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur"
                    },
                    {
                        len: 4,
                        message: "验证码格式错误",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        onSubmit() {
            // this.serverApi.login(this.user).then(result => {
            //     this.$store
            //         .dispatch("LoginSuccess", result.data)
            //         .then(() => {
            //             // 跳转至首页
            //             this.serverApi.goHome( this.$router);
            //         });
            // });

            // 演示测试数据
            let result = this.serverApi.login(this.user);
            if (result.status.code == 0) {
                this.$store
                    .dispatch("LoginSuccess", result.data)
                    .then(() => {
                        this.serverApi.goHome(this.$router);
                    });
            }
            
        }
    }
};
</script>

<style scoped>
.form-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #777;
}

.bg {
    width: 100%;
    height: 100%;
    background-image: url("/image/bg.jpg");
    background-position: center;
    opacity: 0.025;
    animation: bga 14s linear infinite alternate;
}

@keyframes bga {
    form {
        transform: scale(1);
    }
    to {
        transform: scale(1.2);
    }
}

.login-form {
    width: 380px;
    position: fixed;
    left: 50%;
    top: 40%;
    z-index: 999;
    transform: translate(-50%, -50%);
    border: 1px solid #eee;
    border-radius: 6px;
    background-color: #fff;
    padding: 20px 20px 0 20px;
    border: 1px solid #ddd;
    box-shadow: 0 5px 20px rgba(100, 100, 100, 0.3);
}

.form-title {
    text-align: center;

    margin: 5px 0 20px 0;
}

.form-title img {
    height: 26px;
    margin: 3px 5px 0 0;
}

.form-title span {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1px;
    display: inline-block;
    vertical-align: middle;
}

.image-code {
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 4px 0 0 10px;
    cursor: pointer;
}

.action {
    text-align: center;
}
</style>