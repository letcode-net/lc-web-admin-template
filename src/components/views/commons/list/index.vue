<template>
    <div>
        <!-- 搜索条 -->
        <div class="search-bar">
            <a-form-model layout="inline" :model="tableData.searchForm">
                <a-form-model-item :label="field.title" v-for="field in tableData.searchFields" :key="field.code">
                    <a-input v-model="field.value" />
                </a-form-model-item>
                <a-form-model-item>
                    <a-button type="primary" html-type="button">搜索</a-button>
                    <a-button html-type="reset">重置</a-button>
                </a-form-model-item>
            </a-form-model>
        </div>

        <!-- 功能菜单 -->
        <div class="action-bar">
            <button class="m-btn green" @click="addRecord" v-if="module.meta.actions.create">
                <a-icon type="plus" />新增
            </button>

            <button
                class="m-btn red"
                @click="deleteRecords"
                :disabled="selectedRowKeys.length == 0"
                v-if="module.meta.actions.delete"
            >
                <a-icon type="close" />删除
            </button>

            <button class="m-btn blue" @click="loadList">
                <a-icon type="reload" />刷新
            </button>
        </div>

        <!-- 表格 -->
        <a-table
            :columns="tableData.columns"
            :dataSource="tableData.data"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            :pagination="pagination"
            @change="change"
            rowKey="id"
            bordered
        >
            <!-- 操作列 -->
            <template slot="operation" slot-scope="text, record" class="operation">
                
                <span 
                    class="opt-item blue" 
                    v-for="link in module.meta.links" 
                    :key="link.url + record.id" 
                    @click="showLink(link)"
                    v-text="link.title">
                </span>

                <span class="opt-item blue" @click="editRecord(record)" v-if="module.meta.actions.update">修改</span>

                <a-popconfirm
                    title="确定要删除么？"
                    ok-text="确定"
                    cancel-text="取消"
                    placement="topLeft"
                    @confirm="deleteRecord(record)"
                    v-if="module.meta.actions.delete"
                >
                    <span class="opt-item red">删除</span>
                </a-popconfirm>
            </template>
        </a-table>

        <!-- 弹出窗口 -->
        <a-modal :title="dialog.title" v-model="dialog.show" :width="760" :bodyStyle="{padding: '10px'}" :footer="null">
            <Dialog
                :params="dialog.params"
                @close="() => dialog.show = false"
            ></Dialog>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: "ListView",
    props: ["package", "domain"],
    components: {
        Dialog: resolve => require(["./components/Dialog"], resolve)
    },
    data() {
        return {
            selectedRowKeys: [],
            tableData: {
                searchForm: {
                    username: "",
                    nickname: "",
                    mobile: "",
                    email: ""
                },
                searchFields: [],
                columns: [],
                data: []
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
                title: "",
                params: {}
            }
        };
    },
    computed: {
        // 当前功能模块信息
        module() {
            return this.$api[this.package][this.domain];
        },
        // 当前站点的URL
        baseUrl(){
            let url = window.location.href;
            url = url.substring(0, url.indexOf('#') + 1);
            return url;
        }
    },
    mounted() {
        this.loadList();
    },
    methods: {
        // 加载列表数据
        loadList() {
            let result = this.module.loadList({});
            // 添加key属性
            result.data.list.map(row => {
                row.key = row.id;
            });

            // 判断是否要执行前置列表数据处理
            if (this.module.listAction) {
                result.data.list.map(this.module.listAction);
            }

            // 初始化导航信息
            this.pagination.total = result.data.page.rows;

            // 初始化表头信息
            this.tableData.columns.splice(0);
            let columns = result.data.columns;
            for (const c of columns) {
                this.tableData.columns.push(c);
            }
            this.tableData.columns.push({
                title: "操作",
                dataIndex: "operation",
                scopedSlots: { customRender: "operation" }
            });

            // 初始化搜索字段
            this.tableData.searchFields.splice(0);
            for (let key in result.data.searchFields) {
                this.tableData.searchFields.push({
                    code: key,
                    value: '',
                    title: result.data.searchFields[key]
                });
            }

            // 初始化数据记录
            this.tableData.data.splice(0);
            result.data.list.forEach(row => {
                this.tableData.data.push(row);
            });
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
        showLink(link){
            if(link.type == 'page'){
                this.$emit("goPage", link);
            }else if(link.type == 'dialog'){
                this.dialog.title = link.title;
                this.dialog.show = true;
            }
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