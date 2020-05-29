<template>
    <div class="statistic">
        <div :class="['s-icon', color]">
            <a-icon :type="icon" />
        </div>
        <div class="s-info">
            <p class="label" v-text="label"></p>
            <p class="number" v-text="number"></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Statistic',
    props: ['label', 'number', 'icon', 'color']
};
</script>

<style scoped>
.statistic{
    border-radius: 6px;
    border: 1px solid #ddd;
}

.statistic::after{
    content: '';
    display: block;
    clear: both;
}

.s-icon{
    float: left;
    padding: 0 0 0 25px;
    font-size: 50px;
    height: 80px;
    line-height: 80px;
}

.s-info{
    float: right;
    margin: 10px 30px 0 0;
}

.s-info p{
    margin: 0;
    padding: 0;
}

.s-info .label{
    font-size: 15px;
}

.s-info .number{
    font-weight: 600;
    font-size: 30px;
    line-height: 40px;
}

</style>