<template>
    <div class="dashboard">
        <a-row class="chart-box" type="flex" justify="space-between">
            <a-col :span="5">
                <Statistic 
                    label="用户" 
                    number="12,300" 
                    icon="user" 
                    color="green" >
                </Statistic>
            </a-col>
            <a-col :span="5">
                <Statistic 
                    label="订单" 
                    number="320" 
                    icon="snippets" 
                    color="green" >
                </Statistic>
            </a-col>
            <a-col :span="5">
                <Statistic 
                    label="流水" 
                    number="43,200" 
                    icon="account-book" 
                    color="orange" >
                </Statistic>
            </a-col>
            <a-col :span="5">
                <Statistic 
                    label="盈利" 
                    number="8,600" 
                    icon="pay-circle" 
                    color="red" >
                </Statistic>
            </a-col>
        </a-row>
        <a-row class="chart-box border-box">
            <LineChart :chart-data="lineChartData"></LineChart>
        </a-row>
        <a-row class="chart-box border-box" type="flex" justify="space-between">
            <a-col :span="7">
                <BarChart></BarChart>
            </a-col>
            <a-col :span="7">
                <DoughnutChart></DoughnutChart>
            </a-col>
            <a-col :span="7">
                <PieChart></PieChart>
            </a-col>
        </a-row>
    </div>
</template>

<script>

// 折线表数据
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
    name: "Dashboard",
    components: {
        Statistic: (resolve) => require(['./components/Statistic'], resolve), 
        LineChart: (resolve) => require(['./components/LineChart'], resolve), 
        BarChart: (resolve) => require(['./components/BarChart'], resolve), 
        PieChart: (resolve) => require(['./components/PieChart'], resolve), 
        DoughnutChart: (resolve) => require(['./components/DoughnutChart'], resolve), 
    },
    data() {
        return {
            lineChartData: lineChartData.newVisitis
        }
    },
};
</script>

<style scoped>
.dashboard{
    padding: 0 20px;
    box-sizing: border-box;
}
.chart-box{
    margin: 5px 0 40px 0;
    width: 100%;
    padding: 20px 10px 0 10px;
    box-sizing: border-box;
}

.border-box{
    border-top: 1px solid #eee;
}
</style>