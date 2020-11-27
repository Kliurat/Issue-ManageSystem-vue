<template>
  <div id="main">
    <div id="Inquire_body">
      <h2 class="head">Issue查询</h2>
      <div class="link-top"></div>
      <br />
      <br />
      <form action="">
        <div class="table_all">
          <table class="table table-hover">
            <tbody class="table_boay">
              <tr class="align">
                <td scope="row">
                  Issue NO <input type="text" maxlength="30" ref="Issue_NO" />
                </td>
                <td>
                  Issue 状态
                  <select name="status" id="select" ref="select">
                    <option class="form-control" selected="selected"></option>
                    <option class="form-control" value="0">待修改</option>
                    <option class="form-control" value="1">待验证</option>
                    <option class="form-control" value="-1">已关闭</option>
                  </select>
                </td>
                <td>
                  创建时间<input type="datetime-local" ref="create_time" /> 至
                  <input type="datetime-local" ref="create_time1" />
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
                    :placeholder="modifyUser"
                    ref="modify"
                  />
                </td>
                <td>
                  修改时间<input type="datetime-local" ref="modify_time" /> 至
                  <input type="datetime-local" ref="modify_time1" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <div id="button">
        <button type="button" class="btn btn-info" @click="sub()">查询</button>
        <button type="reset" class="btn btn-default" @click="clear()">
          清空
        </button>
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
                      isShowDetail,
                      1
                    )
                  "
                >
                  详情
                </button>
                <button
                  type="button"
                  class="btn btn-default"
                  v-if="
                    showBtn(
                      list.status,
                      list.createPersonID,
                      list.modifyPersonID
                    )
                  "
                  @click="
                    gotoShow(
                      list.issueNo,
                      list.status,
                      list.createPersonID,
                      list.modifyPersonID,
                      isShowDetail2,
                      2
                    )
                  "
                >
                  修改
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
        <span class="sumpage">共{{pages.length}}页</span>
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
    };
  },
  created() {
    const url = this.globalHttpUrl + "issue/queryIssueByID";
    axios({
      method: "post",
      url: url,
      data: this.$qs.stringify({
        modifyPersonID: this.$store.state.user.loginID,
        createPersonID: this.$store.state.user.loginID,
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
    sub() {//提交查询
      if (this.$refs.create_time1.value == null) {
        this.$refs.create_time1.value = new Date();
      }
      if (this.$refs.modify_time1.value == null) {
        this.$refs.modify_time1.value = new Date();
      }
      if (this.$refs.create_time.value > this.$refs.create_time1.value) {
        alert("创建时间不符合条件");
      } else if (this.$refs.modify_time.value > this.$refs.modify_time1.value) {
        alert("修改时间不符合条件");
      } else {
        const url = this.globalHttpUrl + "issue/query";
        axios({

          method: "post",
          url: url,
          data: this.$qs.stringify({
            issueNo:this.$refs.Issue_NO.value,
            status:this.$refs.select.value,
            createStartDate:null,
            createEndDate:this.$refs.create_time1.value,
            createPersonName:this.$refs.create.value,
            modifyPersonName:this.$refs.modify.value,
            modifyStartDate:this.$refs.modify_time.value,
            modifyEndDate:this.$refs.modify_time1.value,
          }),

        })
          .then((list) => {
            this.users = [];
            this.pages = [];
            this.users = list.data.data;
            this.total = this.users.length;
            if (this.users.length == 0) {
              location.reload();
              alert("查询不到该条件的信息");
            }
            this.pageList();
            this.getLocalPage();
            this.getPageUsers();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    showBtn(data, id, id2) {//判断修改按钮是否显示
      if (
        data == -1 ||
        (this.$store.state.user.loginID != id &&
          this.$store.state.user.loginID != id2)
      ) {
        return false;
      } else {
        return true;
      }
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
    gotoShow(data, status, create, modify, isShowDetail,num) {//页面跳转
      this.$router.push({
        name: "showDeatail",
        params: {
          data: data,
          status: status,
          create: create,
          modify: modify,
          isShowDetail: isShowDetail,
          num: num
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
    clear() {//清空查询
      this.$refs.Issue_NO.value = "";
      this.$refs.create.value = "";
      this.$refs.modify.value = "";
      this.$refs.create_time.value = "";
      this.$refs.create_time1.value = "";
      this.$refs.modify_time.value = "";
      this.$refs.modify_time1.value = "";
      this.$refs.select.value = "";
      this.modifierName = null;
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
  margin: 50px 0px 50px 0px;
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
.goto {
  width: 70px;
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
#main {
  width: 90%;
  margin: auto;
}
.table-striped{
  width: 100%;
  margin: 0;
}
</style>
