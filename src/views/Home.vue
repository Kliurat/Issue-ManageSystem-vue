<template>
    <div id="main">
        <h1>GBA Issue管理系统</h1>
        <div>
            <button type="button" class="btn btn-default" @click="goToRegistered">注册</button>
            <button type="button" class="btn btn-default" @click="goToLogin">登陆</button>
            <span id="username">/welcome ???</span>
            <button type="button" class="btn btn-default" id="btn3">修改个人信息</button>
        </div>
        <div id="btn_issue">
            <button type="button" class="btn btn-default" @click="goToCreate">创建新Issue</button>
            <button type="button" class="btn btn-default" @click="isShowDate">Issue 报表</button>
            <button type="button" class="btn btn-default" @click="goToManage">账号管理</button>
        </div>
        <br>
        <br>
        <div>
          
                    <!-- 组织组件子组件A -->
                    <Inquire  @callBackInfo="handleInfo"></Inquire>

                    <!-- 部门领导信息子组件B -->
                    <IssuesList :partInfo="infos" ></IssuesList>

                    <!-- 人员信息 -->
                    <!-- <PersonTable></PersonTable> -->
        </div>
        <!-- <Inquire />
        <IssuesList v-show="isShow"/> -->
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
    },
    data() {
        return {
            isShow:true,
            infos: [],
        }
    },
    methods: {
        isShowDate: function(){
            this.isShow = !this.isShow
        },
        goToCreate: function () {
            this.$router.replace('/create')
        },
        goToLogin: function () {
            this.$router.replace('/login')
        },
        goToManage: function(){
            this.$router.replace('/manage')
        },
        goToLogin: function(){
            this.$router.replace('/login')
        },
        goToRegistered: function(){
            this.$router.replace('/registered')
        },
        
        handleInfo(data){
            // console.log({prop:data})
            this.infos = data
            // console.log(this.infos)
        },
        
    },
}
</script>

<style scoped>
#main {
    background-color: #e4c9e4;
}
h1{
    text-align: center;
}
.btn-default {
  padding-left: 12px;
  border-radius: 10px;
  border: 1px solid rgb(58, 184, 241);
  margin: 0;
  margin-left: 10px;
  background-color: white;
}
#username {
    font-size: 30px;
    color: blueviolet;
}
#btn3 {
    margin-left: 100px;
}
#btn_issue .btn{
    margin: 20px 20px 10px 200px;
    width: 200px;
}
</style>