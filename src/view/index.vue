<template>
    <div class="layout">
        <Sidebar :collapsed="isCollapsed"></Sidebar>
        
        <Header :style="{padding: 0}" class="layout-header-bar">
            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
        </Header>
        <Layout class="content">
            <Content class="appView">
                <router-view></router-view>
            </Content>
        </Layout>
    </div>
</template>
<script>

import Sidebar from '../components/sidebar';
import axios from 'axios';
import loginShow from '../lib/loginShow';
export default {
    data () {
        return {
            isCollapsed:false,
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
        collapsedSider () {
            this.isCollapsed = !this.isCollapsed  
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
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
    .layout-header-bar{
        display: flex;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }

    .menu-icon{
        transition: all .3s;
        cursor: pointer;
        height: 24px;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .content {
        display: flex;
        padding: 20px;
    }
    .appView {
        background-color: #fff;
        min-height: 500px;
        
    }
</style>