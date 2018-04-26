<template>
  <div class="content_box">
    <div class="dashboard-editor-container lineChartTable">
        <line-chart></line-chart>
    </div>
    <div class="tableTitle clearfix">
        <div class="fl">预约总量: <span class="successColor">{{this.count}}</span></div>
        <div class="fr_2">
            <i class="right_20">IOS: <span class="darkPrimary">{{this.iosc}}</span></i> <i>Android: <span class="darkPrimary">{{this.androidC}}</span></i>
        </div>
    </div>
    <Table class="tableStyle" :columns="columns" :data="data"></Table>
    <Page class="pageInfo"
			@on-change="pageShow"
			:total="total" 
			:page-size="pageSize" 
			:current='currentPage' 
			show-elevator 
		></Page>
  </div>
</template>

<script>
import LineChart from '../components/LineChart'
import axios from "axios";

export default {
  name: 'dashboard-admin',
  components: {
    LineChart
  },
  data() {
    return {
      columns: [
        {
            title: 'id',
            key: 'id'
        },
        {
            title: '手机号',
            key: 'mobile'
        },
        {
            title: '客户端',
            key: 'type'
        },
        {
            title: '时间',
            key: 'time'
        },
      ],
      data: [],
      iosc: 0,
      androidC: 0,
      total: 1,
			currentPage: 1,
			pageSize: 5
    }
  },
  methods: {
    getList () {
      let pageNo = parseInt(this.currentPage) - 1;
      axios.get(`http://localhost:3000/admin/subscribe/list?pageNo=${pageNo}&pageSize=${this.pageSize}`).then(d => {
        const data = d.data.data
        const users = data.rows;
        let list = [];
				for (let user of users) {
					user.type = user.type == 1 ? 'IOS' : 'Android';
					user.time = new Date(parseInt(user.time) * 1000).toLocaleString();
					list.push(user);
        }
        this.data = list;
        this.total = data.count;
        this.count = data.count;
        this.iosc = data.iosc;
        this.androidC = data.androidC;
			})
    },
    pageShow(d){
			this.currentPage = d;
			this.getList();
		},
  },
  mounted(){
		this.getList();
	}
}
</script>

<style scoped>

    .content_box {
        padding: 20px;
    }
    .lineChartTable {
        margin-bottom: 20px;
    }

    .tableTitle {
        font-size: 20px;
        line-height: 46px;
    }

    .tableStyle {
        margin-bottom: 30px;
    }
    .pageInfo {
        text-align: center;
        margin-bottom: 50px;
    }

    .fl {
        float: left
    }
    .fr_2 {
        float: right;
        margin-right: 20px;
    }

    .clearfix::after {
        content: ".";
        clear: both;
        display: block;
        overflow: hidden;
        font-size: 0;
        height: 0;
    }

    .clearfix {
        zoom: 1;
    }
    .successColor {
        color: #19be6b;
    }
    .darkPrimary {
        color: #2b85e4;
    }
    i {
        font-style: normal;
        text-decoration: none;
    }

    .right_20 {
        margin-right: 20px;
    }
</style>
