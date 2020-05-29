<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts 主题皮肤
export default {
    name: "PieChart",
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
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    left: "center",
                    bottom: "10",
                    data: [
                        "Java",
                        "C",
                        "C++",
                        "Python",
                        "Golang"
                    ]
                },
                series: [
                    {
                        name: "市场份额",
                        type: "pie",
                        roseType: "radius",
                        radius: [15, 95],
                        center: ["50%", "38%"],
                        data: [
                            { value: 320, name: "Java" },
                            { value: 240, name: "C" },
                            { value: 149, name: "C++" },
                            { value: 100, name: "Python" },
                            { value: 59, name: "Golang" }
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