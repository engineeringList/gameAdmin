<template>
    <div class="content_box">
        <Breadcrumb class="brands">
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem to="/articlelist">文章列表</BreadcrumbItem>
            <Button class="searchBtn" type="primary"  @click="addActivity"><Icon type="plus-round"></Icon> 添 加</Button>
        </Breadcrumb>
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
import axios from 'axios'
export default {
    name: 'list',
    data () {
        return {
            columns: [
                {
                    title: 'id',
                    key: 'id'
                },
                {
                    title: '标题',
                    key: 'title'
                },
                {
                    title: '类型',
                    key: 'type',
                    render:  (h, params) =>{
                        return h('span',{
                        },params.row.type == 1 ? '新闻' :(params.row.type == 2 ? '公告': '活动' ) ) 
                    }
                },
                {
                    title: '时间',
                    key: 'time',
                    render:  (h, params) =>{
                        return h('span',{

                        },this.datatime(params.row.createTime)) 
                    }
                },
                {
                    title : '操作',
                    width: 200,
                    align: 'center',
                    key : "mark",
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    backgroundColor: "#2d8cf0",
                                    textAlign:"center",
                                    color:"#eee",
                                    marginRight: "20px"
                                },
                                on : {
                                    click : ()=> {
                                        window.location.href = '/#/article?id=' + params.row.id
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                }
            ],
            data: [],
            total: 1,
            currentPage: 1,
            pageSize: 10
        }
    },
   // 页面加载后执行 为编辑器的图片图标和视频图标绑定点击事件
    mounted() {
        this.getList();
    },
    methods: {
	  	getList () {
            let pageNo = parseInt(this.currentPage) - 1;
            axios.get(`/api/news?pageNo=${pageNo}&pageSize=${this.pageSize}`).then(d => {
                console.log(d)
                const data = d.data.data.news
                
                this.data = data.rows;
                this.total = data.count;
            })
        },
        pageShow(d){
                this.currentPage = d;
                this.getList();
        },
        datatime(time){
            var date = new Date(time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours() + ':';
            var Mi = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes() + ':';
            var S = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            return Y+M+D+H+Mi+S;
        },
        addActivity() {
            window.location.href = '#/article';
        }
    }
}
</script>

<style scoped>
    .crumbs{
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        border-radius: 5px;
    }
    .tableStyle {
        margin-bottom: 20px;
    }
    .pageInfo {
        text-align: center;
        margin-bottom: 20px;
    }
    .brands {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        /* padding-left: 20px; */
        margin-bottom: 20px;
    }
    .searchBtn{
        float: right;
        margin-right: 10px;
        margin-top: 7px;
    }
</style>