<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts 主题皮肤
export default {
    name: "DoughnutChart",
    props: {
        className: {
            type: String,
            default: "chart"
        },
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "300px"
        }
    },
    data() {
        return {
            chart: null
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart();
        });
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, "macarons");

            this.chart.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    left: "center",
                    bottom: "0",
                    data: [
                        "直访",
                        "邮件",
                        "联盟",
                        "视频",
                        "搜索"
                    ]
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: "center"
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: "30",
                                fontWeight: "bold"
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 335, name: "直访" },
                            { value: 310, name: "邮件" },
                            { value: 234, name: "联盟" },
                            { value: 135, name: "视频" },
                            { value: 1548, name: "搜索" }
                        ],
                        animationEasing: "cubicInOut",
                        animationDuration: 2600
                    }
                ]
            });
        }
    }
};
</script>

<style scoped>
</style>