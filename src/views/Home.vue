<template>
    <div id="main">
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

</style>