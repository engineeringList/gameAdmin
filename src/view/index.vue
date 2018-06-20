<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row class="content" type="flex" :class='{"layout-hide-text": leftSmallFlag}'>
            <Col :span="spanLeft" class="layout-menu-left">
                <Sidebar v-bind:spanLeft="spanLeft"></Sidebar>
            </Col>
            <Col :span="spanRight" class="contentRight">
                <div class="layout-header">
                    <!-- <Button class="btnStyle" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button> -->
                    <div class="exitLogin" @click="outlogin">退出登录</div>
                </div>    
                <div class="viewContent">
                    <router-view></router-view>
                </div>
                <div class="layout-copy">
                    2017-2018 &copy; www.hw.mangofun.cn
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import Sidebar from '../components/sidebar';
import axios from 'axios';
import loginShow from '../lib/loginShow';
axios.defaults.baseURL = 'http://localhost:3000';
export default {
    data () {
        return {
            leftSmallFlag: false,
            isCollapsed:false,
            spanLeft: 4,
            spanRight: 20,
        }
    },
    beforeRouteEnter (to, from, next) {
        loginShow().then(d => {
            next();
        }).catch(err => {
            return next("/login");
        });
    },
    // beforeRouteUpdate (to, from, next) {
    //     loginShow().then(d => {
    //         next();
    //     }).catch(err => {
    //         return next("/login");
    //     });
    // },
    methods: {
        collapsedSider () {
            this.isCollapsed = !this.isCollapsed  
        },
        outlogin() {
            console.log(1111);
            localStorage.clear();
            window.location.href ="/#/login";
        }
    },
    components :{
        Sidebar
    },
    computed: {
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
    },
    mounted (){
    }
}

</script>
<style scoped>
    .layout{
        height: 100%;
        width: 100%;
        /* border: 1px solid #d7dde4; */
        /* background: #f5f7f9; */
        position: relative;
        /* border-radius: 4px; */
        overflow: hidden;
    }
    .content{
        height: 100%;
    }
    .layout-copy{
        /* width: calc(100% - 200px); */
        /* position: fixed; */
        /* z-index: -1; */
        /* bottom: 0; */
        text-align: center;
        padding: 20px 0;
        color: #9ea7b4;
        background-color: #f5f7f9;
    }
    .viewContent {
        padding: 20px; 
    }
    .layout-menu-left{
        background: #464c5b;
        width: 250px;
    }

    .layout-hide-text .layout-menu-left {
        width: 90px;
    }

    .layout-hide-text .layout-copy {
        width: calc(100% - 70px);
    }

    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        z-index: 9;
    }
    .contentRight {
        height: auto;
        overflow: auto;
        flex: 1;
    }
    .exitLogin {
        font-size: 18px;
        line-height: 60px;
        color: cornflowerblue;
        float: right;
        margin-right: 20px;
        cursor: pointer;
    }
    .admin{
        font-size: 18px;
        line-height: 60px;
        float: right;
        margin-right: 20px;
    }

    .btnStyle {
        margin-top: 5px;
        margin-left: 5px;
    }
</style>
<style>
    html , body , #app{
        width: 100%;
        height: 100%;
    }
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    .clearfix { 
        *zoom: 1; 
    } 
    
    .clearfix:before, 
    .clearfix:after { 
        display: table; 
        line-height: 0; 
        content: ""; 
    } 
    
    .clearfix:after { 
        clear: both; 
    } 
</style>