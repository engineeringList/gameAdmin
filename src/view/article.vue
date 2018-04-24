<template>
  <div class="dashboard-editor-container">
      <line-chart :chart-data="lineChartData"></line-chart>
  </div>
</template>

<script>
import LineChart from '../components/LineChart'

const lineChartData = {
  newVisitis: {
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'dashboard-admin',
  components: {
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>