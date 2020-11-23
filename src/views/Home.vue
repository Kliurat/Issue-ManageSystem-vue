<template>
  <div id="main">
    <div class="homeNav">
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
        <button
          type="button"
          class="btn btn-default"
          id="btn3"
          v-if="isLogined&&!isSuper"
          @click="goToModify"
          
        >
          修改个人信息
        </button>
      </div>
     
      <div id="btn_issue" v-if="isLogined">
        <button
          type="button"
          class="btn btn-default"
          @click="goToCreate"
          v-if="!checkRole&&!isSuper"
        >
          创建新Issue
        </button>
        <button
          type="button"
          class="btn btn-default"
          @click="goToReport"
          v-if="checkRole&&isSuper"
        >
          Issue 报表
        </button>
        <button
          type="button"
          class="btn btn-default"
          @click="goToManage"
          v-if="isSuper"
        >
          账号管理
        </button>
      </div>
    </div>
     <div class="photo" v-if="!isLogined||isSuper">
        <img src="/pic/error.jpg" alt="" id="photo" />
      </div>
    <br />
    <br />
    <div v-if="!isLogined||isSuper" class="group_msg">
      <h2>第五组：佛</h2>
      <h4>
        赖炎林，蔡海锋，柯炜杰，梁悦荣，温津杰<br />
        李潮平，成明强，陈海兴，李荣浩，陈汉健
      </h4>
    </div>
    <div v-if="isLogined&&!isSuper">
      <!-- <Inquire @callBackInfo="handleInfo"></Inquire>

      <IssuesList :partInfo="infos"></IssuesList> -->
      <InquireList></InquireList>
    </div>
  </div>
</template>

<script>
import InquireList from "@/components/InquireList.vue";
export default {
  name: "Home", //主界面
  components: {
    InquireList,
  },
  data() {
    return {
      infos: [],
      isLogined: false,
      checkRole: "",
      isSuper: false,
      user: {
        username: "",
        loginID: "",
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
    goToModify: function () {
      this.$router.replace("/modify");
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
      this.user = this.$store.state.user;
      this.checkRole = this.user.role;
      if (this.user.loginID == "Admin") {
        this.isSuper = true;
      }
    } else {
    }
  },
};
</script>

<style scoped>
#main {
    background-color: #e4c9e4;
    width: 100%;
    height:100%;
   
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
#btn_issue{
  text-align: center;
}
#btn_issue .btn {
  margin-top: 10px;
  width: 200px;
}
.homeNav {
  position: static;
}
.group_msg {
  text-align: center;
}
.photo {
  text-align: center;
}
#photo {
  height: 400px;
}
</style>
