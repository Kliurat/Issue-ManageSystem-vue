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
          <button class="btn btn-default btn1 btn7" id="sub" type="button" @click="sub()">
            查询
          </button>
          <button class="btn btn-default btn1 btn7" id="reset" type="reset" @click="clear">
            清空
          </button>
        </div>
      </form>
      
      
      <br />
      <h2 class="head">统计报表</h2>
      <div class="link-top"></div>
      <a :href="exportUrl" class="btn btn-default btn1 btn3">导出报表</a>
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
        <span class="sumpage">共{{total}}条</span>
        <button type="button" class="btn btn-default" @click="prev()">
          <b-icon icon="caret-left-fill"></b-icon>
        </button>
        <button
          class="btn btn-default btn2"
          :class="[page+1 == currentPage? 'btn btn-default btn2 active':'btn btn-default btn2']"
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
    
  </div>
</template>

<script>
import InquireList from "@/components/InquireList.vue";
import axios from "axios";
export default {
  name: "Report", //报表
  data() {
    return {
      exportUrl:"http://192.168.3.18:8888/excel",
      users: [],
      total: 0,
      amount: 20,
      currentPage: 1,
      currentPageUsers: [],
      page: [],
      pages: [],
      localPage:1,
      globalHttpUrl: this.COMMON.httpUrl,
      user: {
        sortID: "",
        loginID: "",
        username: "",
        email: "",
        registeDate: "",
        status: "",
        role: "",
        active: ""
      },
      isShow: true
    };
  },

  methods: {
    exportReport(){
      
      axios({
      method: "get",
      url: this.globalHttpUrl + "/excel",
    })
      .then((data) => {
        
      })
      .catch((err) => {
        console.log(err);
      });
    },
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
          this.getLocalPage();
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
      this.getLocalPage();
    },
    goto(event) {
      this.currentPage = event.target.value;
      this.getPageUsers();
      this.getLocalPage();
      this.$refs.pageTo.value = "";
    },
    prev() {
      if (this.currentPage != 1) this.currentPage--;
      this.getPageUsers();
      this.getLocalPage();
    },
    next() {
      if (this.currentPage != this.pages.length) this.currentPage++;
      this.getPageUsers();
      this.getLocalPage();
    },
    getPageUsers() {
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
    pageList() {
      this.pages = [];
      let j = this.total / this.amount;
      for (let i = 0; i < j; i++) this.pages[i] = i;
    },
    back(){
        this.$router.replace("/");
    },
    getLocalPage(){
      this.page=[];
      if(parseInt(this.currentPage/5)==Math.ceil(this.currentPage/5)){
         this.localPage=parseInt(this.currentPage/5);
      }else{
        this.localPage=parseInt(this.currentPage/5)+1;
      }
     
      
      let j = 5*this.localPage;
      if((this.pages.length-j)>0){
        for(let i=0;i<5;i++){
          this.page[i]=this.pages[i+j-5];
          
          
        }
      }else{
        for(let i=0;i<(this.pages.length-j+5);i++){
          this.page[i]=this.pages[i+j-5];
          
        }
      }
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
        this.getLocalPage();
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
  margin-top: 90px;
  text-align: center;
}
#table_boay {
  margin: 50px;
  margin-top: 70px;
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
    background-color: #5BC0DE;
    color: white;
    width: 100px;
    height: 50px;
    font-size: 25px;
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
  width: 90%;
  margin: auto;
}
h1 {
  height: 70px;
  width: 100%;
  position: fixed;
  text-align: center;
  background-image: url(/pic/13.jpg);
  top: 0;
}
.btn3 {
  display: block;
  margin-top: 20px;
  float: right;
  background-color: #5BC0DE;
  color: white;
}
.current {
  margin-left: 10px;
}
.sumpage{
  margin-right: 10px;
  margin-left: 10px;
}
.btn7{
  width: 100px;
  height: 50px;
}
.goto {
  width: 70px;
}
.active {
  background: #17a2b8;
   border: 1px solid #17a2b8;
   color: #fff;
 }
</style>
