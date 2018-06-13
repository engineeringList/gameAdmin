<template>
    <Sider ref="side1"  hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" :class="menuitemClasses">
        <Menu active-name="1-1"  theme="dark" width="auto" :accordion="true" :v-model="lists"> 
            <router-link v-for="(list) in lists" :to=list.pathTo  :key="list.title">
                <MenuItem :name="list.name">
                    <Icon class="nav_1" :type="list.icon"></Icon>
                    <span class="layout-text">{{list.title}}</span>
                </MenuItem>
            </router-link>
        </Menu>
    </Sider>
</template>
<script>
export default {
    props: ['collapsed'],
    data(){
        return {
            lists : [
                {   
                    name: "1-1",
                    icon : "person-stalker",
                    title : "首页",
                    pathTo :"/"
                },
                {   
                    name: "2-1",
                    icon : "person-stalker",
                    title : "文章管理",
                    pathTo :"/article"
                },
            ],
            isCollapsed :false
        }
    },
    watch :{
        collapsed : function(){
            this.$refs.side1.toggleCollapse();
        }
    },
    computed : {
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    }
}
</script>
<style scoped>
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-item {
        height: 100%;
        float: left;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
