<template>
  <div id="main" >
    <h1 class="home">GBA Issue管理系统</h1>
    <div class="homeBody">
      <div id="Report_body" v-if="isShow">
      <h2 class="head">查询条件</h2>
      <button class="btn btn-default btn4" @click="back">返回</button>
      <div class="link-top"></div>
      <form action="/json/users.json" method="post" class="form-inline">
        <div class="form-group">
          <label for="userId">用户ID</label>
          <input type="text" class="form-control" id="userId" placeholder="" ref="loginID" maxlength="30"/>
        </div>
        <div class="form-group">
          <label for="name">用户姓名</label>
          <input type="text" class="form-control" id="name" placeholder="" ref="username" maxlength="30"/>
        </div>
        <div class="btn">
          <button class="btn btn-default btn1" id="sub" type="button" @click="sub()">
            查询
          </button>
          <button class="btn btn-default btn1" id="reset" type="reset" @click="clear">
            清空
          </button>
        </div>
      </form>
      <br />
      <h2 class="head">统计报表</h2>
      <div class="link-top"></div>
      <div id="table_boay">
        <table class="table table-striped ">
          <thead>
            <tr>
              <th><input type="checkbox" name="" id="" /></th>
              <th>序号</th>
              <th>用户ID</th>
              <th>用户姓名</th>
              <th>创建Issue数</th>
              <th>收到Issue数</th>
              <th>修改Issue数</th>
              <th>完成率</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr v-for="(user, index) in currentPageUsers" :key="index">
              <td scope="row"><input type="checkbox" name="" /></td>
              <td>{{ user.id }}</td>
              <td>{{ user.loginID }}</td>
              <td>{{ user.username }}</td>
              <td><span class="issueColor" @click="goToCreateCount(user.loginID,1)">{{ user.createCount }}</span></td>
              <td><span class="issueColor" @click="goToReceiveCount(user.loginID,2)">{{ user.receiveCount }}</span></td>
              <td><span class="issueColor" @click="goToModifyCount(user.loginID,3)">{{ user.modifyCount }}</span></td>
              <td>{{ user.finishedPer }}%</td>
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
        <button class="btn btn-default" id="pageNumber">{{ amount }}条/页</button>
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
</template>

<script>
import InquireList from "@/components/InquireList.vue";
import axios from "axios";
export default {
  name: "Report", //报表
  data() {
    return {
      users: [],
      total: 0,
      amount: 4,
      currentPage: 1,
      currentPageUsers: [],
      page: [],
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
      isShow: true
    };
  },

  methods: {
    goToCreateCount(data,flag){
      this.$router.push({
        name: "UserIssueList",
        params: {
          createPersonID: data,
        },
      });
    },
    goToReceiveCount(data,flag){
      this.$router.push({
        name: "UserIssueList",
        params: { 
          modifyPersonID: data,
        },
      });
    },
    goToModifyCount(data,flag){
      this.$router.push({
        name: "UserIssueList",
        params: {
          modifyPersonID: data,
          flag: flag
        },
      });
    },
    clear(){
        this.$refs.loginID.value = null
        this.$refs.username.value = null
    },
    sub() {
      const url = this.globalHttpUrl+"issue/report";
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
          this.users = list.data.data;
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
    back(){
        this.$router.replace("/");
    }
  },
  created(){
      const url = this.globalHttpUrl+"issue/report";
    // axios({
    //   method: "get",
    //   url: url,
    // })
    //   .then((data) => {
    //     this.users = data.data.data;
    //     // console.log(this.users)
    //     this.total = this.users.length;
    //     this.getPageUsers();
    //     this.pageList();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios({
      method: "get",
      url: url,
    })
      .then((data) => {
        // console.log(data.data)
        this.users = data.data.data;
        this.total = this.users.length;
        this.pageList();
        this.getPageUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
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

#glyphicon-align-left {
  color: gray;
}
.btn-default {
  margin: 10px;
}

#page {
  width: 55.484px;
  margin: 10px;
  height: 38px;
  border: 1px;
  padding: 12px;
  border-radius: 5px;
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
.btn4{
    border-radius: 10px;
    border: 1px solid rgb(58, 184, 241);
    float: left;
}
.pageList {
  text-align: center;
}
.kk{
  margin: auto 20px;
}
.issueColor{
  color: rgb(90, 90, 238);
  cursor:pointer;
}
.issueColor:hover{
  color: rgb(218, 30, 177);
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
