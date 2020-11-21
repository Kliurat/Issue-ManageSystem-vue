<template>
  <div id="main">
    <h1>GBA Issue管理系统</h1>
    <div>
      <button
        type="button"
        class="btn btn-default"
        @click="goToRegistered"
        v-show="!isLogined"
      >
        注册
      </button>
      <button
        type="button"
        class="btn btn-default"
        @click="goToLogin"
        v-show="!isLogined"
      >
        登陆
      </button>
      <span id="username">welcome{{ user.username }}</span>
      <button type="button" class="btn btn-default" id="btn3" v-if="isLogined">
        修改个人信息
      </button>
    </div>
    <div id="btn_issue">
      <button type="button" class="btn btn-default" @click="goToCreate">
        创建新Issue
      </button>
      <button type="button" class="btn btn-default" @click="goToReport">
        Issue 报表
      </button>
      <button type="button" class="btn btn-default" @click="goToManage">
        账号管理
      </button>
    </div>
    <br />
    <br />
    <div>
      <Inquire @callBackInfo="handleInfo"></Inquire>

      <IssuesList :partInfo="infos"></IssuesList>
    </div>
  </div>
</template>

<script>
import Inquire from "@/components/Inquire.vue";
import IssuesList from "@/components/IssuesList.vue";
export default {
  name: "Home", //主界面
  components: {
    Inquire,
    IssuesList,
  },
  data() {
    return {
      infos: [],
      isLogined: false,
      user: {
        username: "",
        loginId: "",
      },
    };
  },
  methods: {
    goToCreate: function () {
      this.$router.replace("/create");
    },
    goToLogin: function () {
      this.$router.replace("/login");
    },
    goToManage: function () {
      this.$router.replace("/manage");
    },
    goToLogin: function () {
      this.$router.replace("/login");
    },
    goToRegistered: function () {
      this.$router.replace("/registered");
    },
    goToReport: function () {
      this.$router.replace("/report");
    },

    handleInfo(data) {
      // console.log({prop:data})
      this.infos = data;
      // console.log(this.infos)
    },
  },
  created() {
    if (this.$store.state.token) {
      this.isLogined = true;
      this.user = this.$route.params.user;
    }
  },
};
</script>

<style scoped>
#main {
  background-color: #e4c9e4;
}
h1 {
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
#btn_issue .btn {
  margin: 20px 20px 10px 200px;
  width: 200px;
}
</style>
