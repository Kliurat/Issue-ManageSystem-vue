<template>
  <div id="main">
    <div id="Inquire_body">
      <h2 class="head">Issue查询</h2>
      <div class="link-top"></div>
      <br />
      <br />
      <div class="table_all">
        <table class="table table-hover">
          <tbody class="table_boay">
            <tr class="align">
              <td scope="row">
                Issue NO <input type="number" maxlength="30" ref="Issue_NO" />
              </td>
              <td>
                Issue 状态
                <select name="status" id="select" ref="select">
                  <option class="form-control" selected="selected"></option>
                  <option class="form-control">待修改</option>
                  <option class="form-control">待验证</option>
                  <option class="form-control">已关闭</option>
                </select>
              </td>
              <td>
                创建时间<input type="date" ref="create_time" /> 至
                <input type="date" ref="create_time1" />
              </td>
            </tr>
            <tr class="align">
              <td scope="row" id="create">
                创建人 <input type="text" maxlength="30" ref="create" />
              </td>

              <td id="modify">
                修改人
                <input
                  type="text"
                  maxlength="30"
                  v-model="modifyUser"
                  ref="modify"
                />
              </td>
              <td>
                修改时间<input type="date" ref="modify_time" /> 至
                <input type="date" ref="modify_time1" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="button">
        <button type="button" class="btn btn-info" @click="sub()">查询</button>
        <button type="reset" class="btn btn-default">清空</button>
      </div>
    </div>

    <div id="IssuesList_body">
      <h2 class="head">Issue列表</h2>
      <div class="link-top"></div>
      <div id="table_boay">
        <table class="table table-striped">
          <thead>
            <tr>
              <th><input type="checkbox" name="" id="" /></th>
              <th>序号</th>
              <th style="width: 100px">Issue ID</th>
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
            <tr v-for="(list, index) in currentPageUsers" :key="index">
              <td scope="row"><input type="checkbox" name="" id="" /></td>
              <td>{{ list.id }}</td>
              <td>{{ list.issueNo }}</td>
              <td>{{ list.title }}</td>
              <td>{{ list.createPersonID }}</td>
              <td>{{ list.createDate }}</td>
              <td>{{ list.modifyPersonID }}</td>
              <td>{{ showStatus(list.status) }}</td>
              <td>{{ list.planModifyTime }}</td>
              <td>{{ list.actualComplteTime }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-default"
                  @click="gotoShow(list.issueNo,list.status,list.createPersonID,list.modifyPersonID)"
                >
                  详情
                </button>
                <button
                  type="button"
                  class="btn btn-default"
                  v-if="list.status > -1"
                  @click="gotoShow(list.issueNo,list.status,list.createPersonID,list.modifyPersonID)"
                >
                  修改
                </button>
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
        <button
          type="button"
          class="btn btn-default"
          @click="next()"
          id="Noright"
        >
          <b-icon icon="caret-right-fill"></b-icon>
        </button>
        <button class="btn btn-default" id="pageNumber">
          {{ amount }}条/页
        </button>
        <span>跳至</span>
        <input type="text" @change="goto($event)" class="goto" ref="pageTo" />
        <span>页</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "InquireList",
  data() {
    return {
      modifyUser: this.$store.state.user.username,
      issueID: "",
      issueList: [],
      arrayList: [],
      createName: "",
      modifierName: "",
      globalHttpUrl: this.COMMON.httpUrl,
      users: [],
      total: 0,
      amount: 5,
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
  created() {
    const url = this.globalHttpUrl + "issue/query";
    // const url = "/json/users.json";

    axios({
      method: "post",
      url: url,
      xhrFields: {
        withCredentials: true,
      },
    })
      .then((data) => {
        this.users = data.data.data;
        // console.log(this.users);
        this.total = this.users.length;
        this.pageList();
        this.getPageUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    inquire() {
      this.issueList = this.arrayList;
      this.issueID = this.issueList[1].loginID;
      this.createName = this.issueList[1].role;
      this.modifierName = this.issueList[1].username;
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
    gotoShow(data,status,create,modify) {
      // this.$router.replace("/manage");
      // alert(data)
      this.$router.push({
        name: "showDeatail",
        params: {
          data: data,
          status: status,
          create: create,
          modify: modify
        },
      });
    },
    showStatus(str) {
      if (str == -1) {
        str = "已关闭";
      } else if (str == 0) {
        str = "待解决";
      } else {
        str = "待验证";
      }
      return str;
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
#main {
  background-color: #e4c9e4;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.link-top {
  width: 100%;
  height: 1px;
  border-top: dashed black 1px;
}
.page-header {
  left: 50px;
  position: relative;
}
#create {
  padding-left: 28px;
}
#select {
  width: 174px;
  height: 30px;
}
#modify {
  padding-left: 38px;
}
.align {
  padding-left: 50px;
}
#button {
  margin-top: 20px;
  text-align: center;
}
#button button {
  margin: 20px;
  width: 100px;
}
.table_boay {
  margin: 30px;
}
.btn-default {
  background-color: white;
}
.head {
  margin-bottom: 20px;
  margin-left: 20px;
}
.table_all {
  margin: 20px;
  margin-right: 60px;
  padding-left: 100px;
}
#table_boay {
  margin: 50px;
  background-color: white;
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
.pageList {
  text-align: center;
}
.pageList #pageNumber {
  margin-left: 10px;
}
#tbody {
  text-align: center;
}
#Noright {
  margin-left: 10px;
}
</style>
