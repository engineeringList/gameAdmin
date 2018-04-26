<template>
  <div>
    <div class="dashboard-editor-container">
        <line-chart></line-chart>
    </div>
    <p>预约总量: {{this.total}}; IOS: {{this.iosc}}; Android: {{this.androidC}}</p>
    <Table :columns="columns" :data="data"></Table>
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