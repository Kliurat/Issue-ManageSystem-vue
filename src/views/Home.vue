<template>
  <div id="main">
    <div class="homeNav">
      <h1 class="home">GBA Issue管理系统</h1>
      <div class="homeBody">
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

          <span id="username">welcome {{ user.username }}</span>
          <button
            type="button"
            class="btn btn-default"
            id="btn3"
            v-if="isLogined && !isSuper"
            @click="goToModify"
          >
            修改个人信息
          </button>
          <button
            id="logout"
            class="btn btn-default"
            v-if="isLogined"
            @click="logout"
          >
            退出登录
          </button>
        </div>

        <div id="btn_issue" v-if="isLogined">
          <button
            type="button"
            class="btn btn-default"
            @click="goToCreate"
            :disabled="checkRole || isSuper"
          >
            创建新Issue
          </button>
          <button
            type="button"
            class="btn btn-default"
            @click="goToReport"
            :disabled="!checkRole || isSuper"
          >
            Issue 报表
          </button>
          <button
            type="button"
            class="btn btn-default"
            @click="goToManage"
            :disabled="!isSuper"
          >
            账号管理
          </button>
        </div>
      </div>
      <div class="photo" v-if="!isLogined || isSuper"></div>
      <div v-if="!isLogined || isSuper" class="group_msg">
        <div id="groupName">
          <h2>第五组：佛说</h2>
          <br />
          <h4>
            <div>猪长：赖炎林</div>
            <div>蔡海锋，柯炜杰，梁悦荣</div>
            <div>温津杰，陈海兴，李潮平</div>
            <div>李荣浩，成明强，陈汉健</div>
          </h4>
          <br/>
          <h4>
            <div>指导老师：邓家平，朱婷婷，曹世雄，张秋杨</div>
            <div>刘长蒙，杜佳蔚,虞浩，王昊祁</div>
            <div>常超，陈金鸿，丁兆国，孔祥帅</div>
          </h4>           
        </div>
      </div>
      <div v-if="isLogined && !isSuper">
        <InquireList></InquireList>
      </div>
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
      user1: {
        username: "",
        loginID: "",
        email: "",
        role: "",
      },
    };
  },
  methods: {
    goToCreate: function() {
      this.$router.push("/create");
    },
    goToLogin: function() {
      this.$router.push("/login");
    },
    goToManage: function() {
      this.$router.push("/manage");
    },
    goToLogin: function() {
      this.$router.push("/login");
    },
    goToRegistered: function() {
      this.$router.push("/registered");
    },
    goToReport: function() {
      this.$router.push("/report");
    },
    goToModify: function() {
      this.$router.push("/modify");
    },
    logout() {
      this.isLogined = false;
      console.log(this.isLogined);
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
  created() {
    let logined = window.sessionStorage.getItem("logined");
    if (logined) {
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
  margin-left: 50px;
}
#btn3 {
  margin-left: 100px;
}
#btn_issue {
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
  padding-top: 5%;
  text-align: center;
}
#photo {
  height: 400px;
}
.homeBody {
  margin-top: 70px;
}
h1 {
  height: 70px;
  width: 100%;
  position: fixed;
  text-align: center;
  background-image: url(/pic/13.jpg);
  top: 0;
}
#groupName {
  margin: auto;
  width: 600px;
  text-align: center;
}
#groupName div {
  margin-top: 10px;
}
</style>
