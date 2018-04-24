<template>
	<Breadcrumb class="layout-breadcrumb">
        <Breadcrumb-item  v-for="(value , key ,index) in breads" :name="index" :key="index" :href="value.href">{{ value.text }}</Breadcrumb-item>
    </Breadcrumb>
</template>
<script>
export default {
    props: ["breads"],
    data(){
        return {}
    },
    methods: {
    },
}
</script>
<style scoped>
    .layout-breadcrumb{
        background: #f5f7f9;
        padding: 10px 15px;
    }
</style>