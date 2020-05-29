<template>
    <div>
        <!-- 搜索条 -->
        <div class="search-bar">
            <a-form-model layout="inline" :model="searchForm">
                <a-form-model-item label="用户名">
                    <a-input v-model="searchForm.username" />
                </a-form-model-item>
                <a-form-model-item label="昵称">
                    <a-input v-model="searchForm.nickname" />
                </a-form-model-item>
                <a-form-model-item>
                    <a-button type="primary" html-type="button">搜索</a-button>
                    <a-button html-type="reset">重置</a-button>
                </a-form-model-item>
            </a-form-model>
        </div>

        <!-- 功能菜单 -->
        <div class="action-bar">
            <button class="m-btn green" @click="addRecord">
                <a-icon type="plus" />新增
            </button>
            <button
                class="m-btn red"
                @click="deleteRecords"
                :disabled="selectedRowKeys.length == 0"
            >
                <a-icon type="close" />删除
            </button>
        </div>

        <!-- 表格 -->
        <a-table
            :columns="columns"
            :data-source="data"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            :pagination="pagination"
            @change="change"
            rowKey="id"
            bordered
        >
            <!-- 操作列 -->
            <template slot="operation" slot-scope="text, record" class="operation">
                <span class="opt-item blue" @click="editRecord(record)">修改</span>

                <a-popconfirm
                    title="确定要删除么？"
                    ok-text="确定"
                    cancel-text="取消"
                    placement="topLeft"
                    @confirm="deleteRecord(record)"
                >
                    <span class="opt-item red">删除</span>
                </a-popconfirm>
            </template>
        </a-table>

        <!-- 弹出窗口 -->
        <!-- <a-modal :title="dialog.title" v-model="dialog.show" :width="760" :footer="null">
            <Dialog
                :params="dialog.params"
                :componentName="'TestForm'"
                @close="() => dialog.show = false"
            ></Dialog>
        </a-modal> -->
    </div>
</template>

<script>
const columns = [
    {
        title: "序号",
        dataIndex: "id"
    },
    {
        title: "用户名",
        className: "username",
        dataIndex: "username"
    },
    {
        title: "昵称",
        dataIndex: "nickname"
    },
    {
        title: "手机",
        dataIndex: "mobile"
    },
    {
        title: "邮箱",
        dataIndex: "email"
    },
    {
        title: "操作",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" }
    }
];

const data = [
    {
        id: 1,
        username: "admin",
        nickname: "超级管理员",
        mobile: "18810728911",
        email: "code1@letcode.net"
    },
    {
        id: 2,
        username: "user",
        nickname: "普通用户",
        mobile: "18810728922",
        email: "code2@letcode.net"
    },
    {
        id: 3,
        username: "test",
        nickname: "测试用户",
        mobile: "18810728933",
        email: "code3@letcode.net"
    },
    {
        id: 4,
        username: "zhangsan",
        nickname: "张三",
        mobile: "18810728944",
        email: "code4@letcode.net"
    }
];

export default {
    name: "ListView",
    props: ["package", "domain"],
    components: {
        // Dialog: resolve => require(["./components/Dialog"], resolve)
    },
    data() {
        return {
            data,
            columns,
            selectedRowKeys: [],
            searchForm: {
                username: "",
                nickname: "",
                mobile: "",
                email: ""
            },
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
                pageSizeOptions: ["10", "20", "40", "100"],
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal(total, range) {
                    return `显示 ${range[0]} - ${range[1]}，总共 ${total} 条`;
                }
            },
            dialog: {
                show: false,
                title: "添加",
                params: { id: 1 }
            }
        };
    },
    computed: {
        // 当前功能模块信息
        module() {
            return this.$api[this.package][this.domain];
        }
    },
    mounted() {
        this.loadList();
    },
    methods: {
        // 加载列表数据
        loadList() {
            this.module.list({});
        },
        // 处理用户选择
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
        },
        // 处理分页参数变化
        change(pagination) {
            this.pagination.current = pagination.current;
            this.pagination.pageSize = pagination.pageSize;
        },
        // 响应添加按钮
        addRecord() {
            let page = {
                title: "添加" + this.module.meta.title,
                url: this.module.meta.view.form
            };
            this.$emit("goPage", page);
        },
        // 响应行内修改按钮
        editRecord(record) {
            let page = {
                title: "修改" + this.module.meta.title,
                url: this.module.meta.view.form + "/" + record.id
            };
            this.$emit("goPage", page);
        },
        // 响应行内删除按钮
        deleteRecord(record) {
            console.log("删除", record);
        },
        // 响应表头删除按钮
        deleteRecords() {
            this.$confirm({
                title:
                    "确定要删除这" + this.selectedRowKeys.length + "条记录么？",
                onOk: function() {
                    console.log("删除", this.selectedRowKeys);
                }.bind(this),
                onCancel() {}
            });
        },
        // 显示对话框
        showDialog(title, params) {
            this.dialog.title = title;
            this.dialog.params = params;
            this.dialog.show = true;
        }
    }
};
</script>

<style scoped>
.search-bar {
    margin: 10px 0;
    text-align: right;
}

.search-bar button {
    margin-left: 15px;
}

.action-bar {
    padding: 0 0 15px 5px;
}

.action-bar button {
    margin-right: 10px;
}

.opt-item {
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
}
</style>