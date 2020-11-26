<template>
  <div id="main">
    <h1 class="home">GBA Issue管理系统</h1>
    <div class="homeBody">
      <div id="IssuesList_body">
        <h2 class="head">Issue列表</h2>
        <button class="btn btn-default btn4" @click="back">返回</button>
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
                <td>{{ list.createPersonName }}</td>
                <td>{{ list.createDate }}</td>
                <td>{{ list.modifyPersonName }}</td>
                <td>{{ showStatus(list.status) }}</td>
                <td>{{ list.planModifyTime }}</td>
                <td>{{ list.actualComplteTime }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-default"
                    @click="
                      gotoShow(
                        list.issueNo,
                        list.status,
                        list.createPersonID,
                        list.modifyPersonID,
                        isShowDetail
                      )
                    "
                  >
                    详情
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pageList">
          <span class="sumpage">共{{ total }}条</span>
          <button type="button" class="btn btn-default" @click="prev()">
            <b-icon icon="caret-left-fill"></b-icon>
          </button>
          <button
            class="btn btn-default btn2"
            :class="[
              page + 1 == currentPage
                ? 'btn btn-default btn2 active'
                : 'btn btn-default btn2',
            ]"
            v-for="(page, num) in page"
            :key="num"
            @click="to(page + 1)"
          >
            {{ page + 1 }}
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
          <span class="sumpage">跳至</span>
          <input type="text" @change="goto($event)" class="goto" ref="pageTo" />
          <span class="sumpage">页</span>

          <span class="current">当前页：{{ currentPage }}</span>
          <span class="sumpage">共{{ pages.length }}页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserIssueList",
  data() {
    return {
      modifyUser: this.$store.state.user.username,//登陆修改人名字
      isShowDetail: false,//传参1
      isShowDetail2: true,//传参2
      issueID: "",
      issueList: [],//issue列表
      createName: "",//创建人名字
      modifierName: "",//修改人名字
      globalHttpUrl: this.COMMON.httpUrl,//连接地址
      users: [],//用户名字
      total: 0,//数据总数
      amount: 20,//每页显示条数
      currentPage: 1,//当前页
      currentPageUsers: [],//当前页用户数据
      page: [],//当前页按钮列表
      pages: [],//页码按钮列表
      localPage: 1,//按钮当前页
      user: {//用户属性
        sortID: "",
        loginID: "",
        username: "",
        email: "",
        registeDate: "",
        role: "",
        status: "",
        active: "",
      },
      createPersonID: this.$route.params.createPersonID,//获取report页面传来的创建人ID
      modifyPersonID: this.$route.params.modifyPersonID,//获取report页面传来的修改人ID
      status: this.$route.params.flag,//获取report页面传来的issue状态
    };
  },
  created() {
    const url = this.globalHttpUrl + "issue/query";
    axios({
      method: "post",
      url: url,
      data: this.$qs.stringify({
        modifyPersonID: this.modifyPersonID,
        createPersonID: this.createPersonID,
        status: this.status,
      }),
      xhrFields: {
        withCredentials: true,
      },
    })
      .then((data) => {
        this.users = data.data.data;
        this.total = this.users.length;
        if (this.users.length == 0) {
          this.isShow = false;
        }
        this.pageList();
        this.getLocalPage();
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
    to(num) {//按钮跳转
      this.currentPage = num;
      console.log(this.currentPage);
      this.getPageUsers();
      this.getLocalPage();
    },
    goto(event) {//输入跳转
      this.currentPage = event.target.value;
      this.getPageUsers();
      this.getLocalPage();
      this.$refs.pageTo.value = "";
    },
    prev() {//上一页
      if (this.currentPage != 1) this.currentPage--;
      this.getPageUsers();
      this.getLocalPage();
    },
    next() {//下一页
      if (this.currentPage != this.pages.length) this.currentPage++;
      this.getPageUsers();
      this.getLocalPage();
    },
    getPageUsers() {//获取当前页用户
      this.currentPageUsers = [];
      if (this.pages.length != 0) {
        if (this.currentPage != this.pages.length)
          for (let i = 0; i < this.amount; i++) {
            let j = (this.currentPage - 1) * this.amount;
            this.currentPageUsers[i] = this.users[i + j];
          }
        else
          for (
            let i = 0;
            i < this.total - this.amount * (this.pages.length - 1);
            i++
          ) {
            let j = (this.currentPage - 1) * this.amount;
            this.currentPageUsers[i] = this.users[i + j];
          }
      }
    },
    pageList() {//页码数组
      this.pages = [];
      let j = this.total / this.amount;
      for (let i = 0; i < j; i++) this.pages[i] = i;
    },
    back() {//返回主页
      this.$router.replace("/");
    },
    getLocalPage() {//获取当前按钮
      this.page = [];
      if (parseInt(this.currentPage / 5) == Math.ceil(this.currentPage / 5)) {
        this.localPage = parseInt(this.currentPage / 5);
      } else {
        this.localPage = parseInt(this.currentPage / 5) + 1;
      }

      let j = 5 * this.localPage;
      if (this.pages.length - j > 0) {
        for (let i = 0; i < 5; i++) {
          this.page[i] = this.pages[i + j - 5];
        }
      } else {
        for (let i = 0; i < this.pages.length - j + 5; i++) {
          this.page[i] = this.pages[i + j - 5];
        }
      }
    },
    gotoShow(data, status, create, modify, isShowDetail) {//页面跳转
      this.$router.push({
        name: "showDeatail",
        params: {
          data: data,
          status: status,
          create: create,
          modify: modify,
          isShowDetail: isShowDetail,
        },
      });
    },
    showStatus(str) {//判断issue状态
      if (str == -1) {
        str = "已关闭";
      } else if (str == 0) {
        str = "待修改";
      } else {
        str = "待验证";
      }
      return str;
    },
    back() {
      this.$router.replace("/report");
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

.link-top {
  width: 100%;
  height: 1px;
  border-top: dashed black 1px;
}
.page-header {
  left: 50px;
}
#create {
  padding-left: 28px;
}
#select {
  width: 186px;
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
  margin-top: 80px;
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
.btn4 {
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid rgb(58, 184, 241);
  float: left;
  background-color: #5bc0de;
  color: white;
  width: 100px;
  height: 50px;
  font-size: 25px;
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
.current {
  margin-left: 10px;
}
.sumpage {
  margin-right: 10px;
  margin-left: 10px;
}
.active {
  background: #17a2b8;
  border: 1px solid #17a2b8;
  color: #fff;
}

</style>
