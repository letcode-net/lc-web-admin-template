<template>
    <div class="tags-wrap">
        <div 
            v-for="tag in tags" 
            :key="tag.url" 
            :class="['tag', {active: tag.url == current}]"
            @click="changePage(tag)" >
            
            <span v-text="tag.title"></span>
            <a-icon @click.stop.prevent="closePage(tag.url)" type="close" v-if="(!tag.fixed) && (tag.url != current)"  />
        </div>
    </div>
</template>

<script>
export default {
    name: "PageTags",
    props: ['tags', 'current'],
    data() {
        return {};
    },
    methods: {
        changePage(tag){
            this.$emit('changePage', tag);
        },
        closePage(url){
            this.$emit('closePage', url);
        },
        closeAndGo(params){
            console.log(params);
        }
    }
};
</script>

<style scoped>
.tags-wrap{
    white-space: nowrap;
}

.tag{
    display: inline-block;
    border: 1px solid #ddd;
    margin-right: 10px;
    line-height: 24px;
    font-size: 12px;
    cursor: pointer;
    user-select: none;
    border-radius: 4px;
}

.tag.active,
.tag:hover{
    border: none;
    color: #fff;
    background-color: #1890ff;
}

.tag span{
    margin: 0 10px;
}

.tag i{
    margin-right: 5px;
}

.tag i:hover{
    transform: scale(1.2);
}

</style>