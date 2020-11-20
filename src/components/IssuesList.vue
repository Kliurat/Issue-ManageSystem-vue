<template>
  <div id="IssuesList_body">
    <h2 class="head">Issue列表</h2>
    <div class="link-top"></div>
    <div id="table_boay">
      <table class="table table-striped ">
        <thead>
          <tr>
            <th><input type="checkbox" name="" id="" /></th>
            <th>序号</th>
            <th>Issue ID</th>
            <th>Issue 标题</th>
            <th>创建人</th>
            <th>创建时间</th>
            <th>修改人</th>
            <th>Issue 状态</th>
            <th>计划完成时间</th>
            <th>实际完成时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr v-for="(list, index) in partInfo" :key="index">
            <th scope="row"><input type="checkbox" name="" id="" /></th>
            <th>{{ index + 1 }}</th>
            <td>{{ list.role }}</td>
            <td>{{ list.username }}</td>
            <td>{{ list.username }}</td>
            <td>{{ list.username }}</td>
            <td>{{ list.username }}</td>
            <td>{{ list.username }}</td>
            <td>{{ list.username }}</td>
            <td>{{ list.username }}</td>
            <td>{{ list.username }}</td>
            <td>
              <button type="button" class="btn btn-default">详情</button
              ><button type="button" class="btn btn-default">修改</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
import axios from 'axios'
export default {
  name: "IssuesList", //列表
  props: ["partInfo"],
  data() {
    return {
      infos: this.partInfo,
      users: [],
      total: 0,
      amount: 20,
      currentPage: 1,
      currentPageUsers: [],
      page: [],
      user: {
        sortID: "",
        loginID: "",
        username: "",
        email: "",
        registeDate: "",
        role: "",
        status: "",
      },
    };
  },
  methods: {
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
    },
    pageList() {
      let j = this.total / this.amount;
      if (this.total % this.amount != 0) j++;
      for (let i = 1; i <= j; i++) this.page.push(i);
    },
  },
};
</script>

<style scoped>
#IssuesList_body {
  background-color: #e4c9e4;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.head {
  margin-bottom: 20px;
  margin-left: 20px;
}
#table_boay {
  margin: 50px;
  background-color: white;
  text-align: center;
}
.link-top {
  width: 100%;
  height: 1px;
  border-top: dashed black 1px;
}
.btn-default {
  background-color: white;
}
#glyphicon-align-left {
  color: gray;
}
.btn-default {
  margin: 10px;
}
#btn_body {
  text-align: center;
}
#page {
  width: 55.484px;
  margin: 10px;
  height: 38px;
  border: 1px;
  padding: 12px;
  border-radius: 5px;
}
#tbody .btn-default {
  padding-left: 12px;
  border-radius: 10px;
  border: 1px solid rgb(58, 184, 241);
  margin: 0;
  margin-left: 10px;
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
