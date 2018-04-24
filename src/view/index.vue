<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row class="content" type="flex" :class='{"layout-hide-text": leftSmallFlag}'>
            <Col class="layout-menu-left">
                <Sidebar></Sidebar>
            </Col>
            <Col class="contentRight">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                    <div class="admin">admin</div>
                </div>    
                <div class="viewContent">
                    <router-view></router-view>
                </div>
                <div class="layout-copy">
                    2018-2019 &copy; TalkingData
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import Sidebar from '../components/sidebar';
import axios from 'axios';
import loginShow from '../lib/loginShow';
export default {
    data () {
        return {
            leftSmallFlag: false,
            spanLeft: 4,
            spanRight: 20,
        }
    },
    // beforeRouteEnter (to, from, next) {
    //     loginShow().then(d => {
    //         next();
    //     }).catch(err => {
    //         return next("/login");
    //     });
        
    // },
    // beforeRouteUpdate (to, from, next) {
    //     loginShow().then(d => {
    //         next();
    //     }).catch(err => {
    //         return next("/login");
    //     });
    // },
    methods: {
        toggleClick () {
            this.leftSmallFlag = !this.leftSmallFlag;
        }
    },
    components :{
        Sidebar
    },
    mounted (){
    }
}

</script>
<style scoped>
    .layout{
        height: 100%;
        width: 100%;
        border: 1px solid #d7dde4;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .content{
        height: 100%;
    }
    .layout-copy{
        width: calc(100% - 200px);
        position: fixed;
        bottom: 0;
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
        background-color: #f5f7f9;
    }
    .viewContent {
    }
    .layout-menu-left{
        background: #464c5b;
        width: 200px;
    }

    .layout-hide-text .layout-menu-left {
        width: 70px;
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
        padding-bottom: 48px; 
    }
    .admin{
        font-size: 20px;
        line-height: 60px;
        float: right;
        margin-right: 20px;
    }
</style>