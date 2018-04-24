<template>
   <Menu theme="dark" width="auto" :accordion="true" :v-model="lists">
        <div class="layout-logo-left">COSMO</div>    
        <router-link v-for="(list ,index) in lists" :to=list.pathTo  :key="list.title">
            <MenuItem :name="index">
                <Icon class="nav_1" :type="list.icon" :size="iconSize"></Icon>
                <span class="layout-text">{{list.title}}</span>
            </MenuItem>
        </router-link>
    </Menu>
</template>
<script>
export default {
    props: ["spanLeft"],
    data(){
        return {
            lists : [
                {
                    icon : "person-stalker",
                    title : "文章发布",
                    pathTo :"/article"
                }
            ]
        }
    },
    mounted (){
    },
    computed : {
        iconSize () {
            return this.spanLeft === 4 ? 14 : 24;
        }
    }
}
</script>
<style scoped>
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        font-size: 20px;
        color: #9ba7b5;
        line-height: 30px;
        text-align: center;
        border-radius: 3px;
        margin: 15px auto;
        overflow: hidden;
    }

    .layout-hide-text .layout-logo-left {
        font-size: 12px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
