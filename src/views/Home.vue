<template>
    <div id="main">
        <h1>GBA Issue管理系统</h1>
        <div><button type="button" class="btn btn-default">详情</button><button type="button" class="btn btn-default">修改</button></div>
        <Inquire/>
        <IssuesList/>
    </div>
</template>

<script>
import Inquire from '@/components/Inquire.vue'
import IssuesList from '@/components/IssuesList.vue'
export default {
    name: 'Home', //主界面
    components: {
        Inquire,
        IssuesList
    }
}
</script>

<style scoped>
h1{
    text-align: center;
}
</style>