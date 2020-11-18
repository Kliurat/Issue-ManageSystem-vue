<template>
  <div class="manage">
    <h5>查询</h5>
    <hr />
    <form action="" class="form-inline">
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
        <button class="btn btn-default btn1" id="sub" type="submit">
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
      <button type="button" class="btn btn-default">
        <b-icon icon="caret-left-fill"></b-icon>
      </button>
      <button
        class="btn btn-default btn2"
        v-for="(page, num) in page"
        :key="num"
      >
        {{ num + 1 }}
      </button>
      <button type="button" class="btn btn-default">
        <b-icon icon="caret-right-fill"></b-icon>
      </button>
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
    };
  },
  methods: {
    getPageUsers() {
      for (let i = 0; i < this.amount; i++) {
        let j = (this.currentPage - 1) * 10;
        this.currentPageUsers.push(this.users[i + j]);
      }
    },
    pageList() {
      let j = this.total / this.amount;
      if (this.total % this.amount != 0) j++;
      for (let i = 1; i <= j; i++) this.page.push(i);
    },
  },
  created() {
    const url = "/json/users.json";
    axios({
      method: "get",
      url: url,
    })
      .then((data) => {
        this.users = data.data;
        this.total = this.users.length;
        this.getPageUsers();
        this.pageList();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
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
  margin: 20px 80px 0px 150px;
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