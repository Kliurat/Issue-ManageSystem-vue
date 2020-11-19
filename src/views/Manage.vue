<template>
  <div class="manage">
    <h5>查询</h5>
    <hr />
    <form
      action="http://192.168.3.115:8888/selectUser"
      method="post"
      class="form-inline"
    >
      <div class="form-group">
        <label for="userId">用户ID</label>
        <input
          type="text"
          class="form-control"
          id="userId"
          placeholder=""
          ref="loginID"
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
        <td>{{ user.sortID }}</td>
        <td>{{ user.loginID }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.registeDate }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.status }}</td>
        <td>
          <button type="button" class="btn btn-default btn2">注销</button>
          <button type="button" class="btn btn-default btn2">经理</button>
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
      amount: 3,
      currentPage: 1,
      currentPageUsers: [],
      page: [],
      globalHttpUrl: this.COMMON.httpUrl,
    };
  },
  methods: {
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
    getPageUsers() {
      this.currentPageUsers = [];
      if (this.page.length != 0) {
        if (this.currentPage != this.page.length)
          for (let i = 0; i < this.amount; i++) {
            let j = (this.currentPage - 1) * this.amount;
            this.currentPageUsers[i] = this.users[i + j];
            if (this.currentPageUsers[i].status == 1)
              this.currentPageUsers[i].status = "激活";
            if (this.currentPageUsers[i].status == 0)
              this.currentPageUsers[i].status = "已注销";
            if (this.currentPageUsers[i].role == 1)
              this.currentPageUsers[i].role = "经理";
            if (this.currentPageUsers[i].role == 0)
              this.currentPageUsers[i].role = "普通用户";
          }
        else
          for (
            let i = 0;
            i < this.total - this.amount * (this.page.length - 1);
            i++
          ) {
            let j = (this.currentPage - 1) * this.amount;
            this.currentPageUsers[i] = this.users[i + j];
            if (this.currentPageUsers[i].status == 1)
              this.currentPageUsers[i].status = "激活";
            if (this.currentPageUsers[i].status == 0)
              this.currentPageUsers[i].status = "已注销";
            if (this.currentPageUsers[i].role == 1)
              this.currentPageUsers[i].role = "经理";
            if (this.currentPageUsers[i].role == 0)
              this.currentPageUsers[i].role = "普通用户";
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
    const url = "http://192.168.3.114:8888/selectUser";
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
.head {
  margin-bottom: 20px;
  margin-left: 20px;
}
h5 {
  padding-top: 50px;
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
  margin-left: 10px;
}
</style>
