<template>
  <div class="manage">
    <h1 class="home">GBA Issue管理系统</h1>
    <div class="homeBody">
      <img
      src="/pic/issue.gif"
      alt="图片不存在"
      title="点我返回主页"
      class="return"
      @click="regain()"
    />
    <div class="manageform">
      <h5>查询</h5>
      <hr />
      <form class="form-inline">
        <div class="form-group">
          <label for="userId">用户ID</label>
          <input
            type="text"
            class="form-control"
            id="userId"
            placeholder=""
            ref="loginID"
            maxlength="30"
          />
        </div>
        <div class="form-group">
          <label for="name">用户姓名</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder=""
            ref="username"
            maxlength="30"
          />
        </div>
        <div class="btn">
          <button
            class="btn btn-default btn1"
            id="sub"
            type="button"
            @click="sub()"
          >
            查询
          </button>
          <button class="btn btn-default btn1" id="reset" type="reset">
            清空
          </button>
        </div>
      </form>
      <div v-show="!isNull">
      <h5>用户信息</h5>
      <hr />
      <table class="table table-bordered">
        <tr>
          <td>序号</td>
          <td>用户ID</td>
          <td>用户姓名</td>
          <td>邮箱</td>
          <td>注册时间</td>
          <td>用户身份</td>
          <td>账号状态</td>
          <td>操作</td>
        </tr>
        <tr v-for="(user, index) in currentPageUsers" :key="index">
          <td>{{user.sortID}}</td>
          <td>{{ user.loginID }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.registeDate }}</td>
          <td>{{ changeRole(user) }}</td>
          <td>{{ changeStatus(user) }}</td>
          <td>
            <button
              type="button"
              class="btn btn-default btn2"
              @click="logoff(user.loginID)"
              v-if="user.status"
            >
              注销
            </button>
            <button
              type="button"
              class="btn btn-default btn2"
              @click="promotion(user.loginID,user.role)"
              v-if="!user.role && user.status"
            >
              经理
            </button>
            <button
              type="button"
              class="btn btn-default btn2"
              @click="promotion(user.loginID,user.role)"
              v-if="user.role && user.status"
            >
              降职
            </button>
          </td>
        </tr>
      </table>
      <div class="pageList">
        <button type="button" class="btn btn-default" @click="prev()">
          <b-icon icon="caret-left-fill"></b-icon>
        </button>
        <button
          class="btn btn-default btn2"
          v-for="(page, num) in page"
          :key="num"
          @click="to(num + 1)"
        >
          {{ num + 1 }}
        </button>
        <button type="button" class="btn btn-default" @click="next()">
          <b-icon icon="caret-right-fill"></b-icon>
        </button>
        <button class="btn btn-default">{{ amount }}条/页</button>
        <span>跳至</span>
        <input type="text" @change="goto($event)" class="goto" ref="pageTo" />
        <span>页</span>
        <br>
        <span class="kk">共{{total}}条</span>
        <span class="kk">当前页：{{currentPage}}</span>
        <span class="kk">共{{page.length}}页</span>
      </div>
      </div>
      
    </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
export default {
  name: "Manage",
  data() {
    return {
      users: [],
      total: 0,
      amount: 20,
      currentPage: 1,
      currentPageUsers: [],
      page: [],
      isNull:false,
      globalHttpUrl: this.COMMON.httpUrl,
      user: {
        sortID: "",
        loginID: "",
        username: "",
        email: "",
        registeDate: "",
        status: "",
        role: "",
      },
    };
  },
  methods: {
    regain() {
      this.$router.push("/");
    },
    logoff(loginID) {
      const url = this.globalHttpUrl + "update/statusAndrole";
      axios({
        method: "post",
        url: url,
        data: this.$qs.stringify({
          loginID: loginID,
          status: 0,
        }),
      })
        .then((list) => {
          this.users = [];
          this.page = [];
          this.users = list.data;
          this.total = this.users.length;
          this.pageList();
          this.getPageUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    promotion(loginID,role) {
      const url = this.globalHttpUrl + "update/statusAndrole";
      axios({
        method: "post",
        url: url,
        data: this.$qs.stringify({
          loginID: loginID,
          role:role,
        }),
      })
        .then((list) => {
          this.users = [];
          this.page = [];
          this.users = list.data;
          this.total = this.users.length;
          this.pageList();
          this.getPageUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sub() {
      const url = this.globalHttpUrl + "selectUser";
      let str1 = this.$refs.loginID.value;
      let str2 = this.$refs.username.value;
      let str3 = { loginID: str1, username: str2 };
      axios({
        method: "post",
        url: url,
        data: this.$qs.stringify(str3),
      })
        .then((list) => {
          this.users = [];
          this.page = [];
          this.users = list.data;
          this.total = this.users.length;
          this.pageList();
          this.getPageUsers();
          if(this.total==0){
            location.reload(); 
            alert("符合条件数据为零");
          }else{
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    to(num) {
      this.currentPage = num;
      console.log(this.currentPage);
      this.getPageUsers();
    },
    goto(event) {
      this.currentPage = event.target.value;
      this.getPageUsers();
      this.$refs.pageTo.value = "";
    },
    prev() {
      if (this.currentPage != 1) this.currentPage--;
      this.getPageUsers();
    },
    next() {
      if (this.currentPage != this.page.length) this.currentPage++;
      this.getPageUsers();
    },
    changeRole(user) {
      let str;
      if (user.role) str = "经理";
      else str = "普通用户";
      return str;
    },
    changeStatus(user) {
      let str;
      if (user.status) str = "激活";
      else str = "已注销";
      return str;
    },
    getPageUsers() {
      this.currentPageUsers = [];
      if (this.page.length != 0) {
        if (this.currentPage != this.page.length)
          for (let i = 0; i < this.amount; i++) {
            let j = (this.currentPage - 1) * this.amount;
            this.currentPageUsers[i] = this.users[i + j];
          }
        else
          for (
            let i = 0;
            i < this.total - this.amount * (this.page.length - 1);
            i++
          ) {
            let j = (this.currentPage - 1) * this.amount;
            this.currentPageUsers[i] = this.users[i + j];
          }
      }
    },
    pageList() {
      this.page = [];
      let j = this.total / this.amount;
      for (let i = 0; i < j; i++) this.page[i] = i;
    },
  },
  created() {
    const url = this.globalHttpUrl + "selectUser";
    axios({
      method: "get",
      url: url,
    })
      .then((data) => {
        this.users = data.data;
        this.total = this.users.length;
        this.pageList();
        this.getPageUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.manage .return {
  margin: 0px 37%;
  width: 20%;
  height: 100px;
  cursor: pointer;
}
.manageform {
  padding-top: 50px;
  width: 80%;
  margin: auto;
}
h5 {
  padding-top: 2%;
}
.form-inline {
  padding-top: 50px;
  width: 50%;
  margin: auto;
}
.form-group {
  padding-right: 10%;
}
.btn1 {
  margin: 20px 100px 0px 100px;
  padding-left: 12px;
  border-radius: 10px;
  border: 1px solid rgb(58, 184, 241);
}
.btn2 {
  padding-left: 12px;

  border-radius: 10px;
  border: 1px solid rgb(58, 184, 241);
  margin: 0;
  margin-left: 5px;
  margin-bottom: 0px;
}
tr {
  height: 65px;
}
.table {
  text-align: center;
}
.pageList {
  text-align: center;
}
.background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: fixed;
}
input {
  background-color: transparent;
}
.goto {
  width: 100px;
}
.kk{
  margin: auto 20px;
}
.homeBody{
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
</style>