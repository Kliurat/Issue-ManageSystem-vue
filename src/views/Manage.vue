<template>
  <div class="manage">
    <h1 class="home">GBA Issue管理系统</h1>
    <div class="homeBody">
      <img
      src="/pic/return.jpeg"
      alt="图片不存在"
      title="点我返回主页"
      class="return"
      @click="regain()"
    />
    <div class="manageform">
      <h2 >查询</h2>
      <hr />
      <form class="form-inline">
        <div class="form-group">
          <label for="userId"><b>用户ID</b></label>
          <input
            type="text"
            class="form-control select"
            id="userId"
            placeholder=""
            ref="loginID"
            maxlength="30"
          />
        </div>
        <div class="form-group">
          <label for="name"><b>用户姓名</b></label>
          <input
            type="text"
            class="form-control select"
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
      <h2>用户信息</h2>
      <hr />
      <table class="table table-bordered">
        <tr>
          <th>序号</th>
          <th>用户ID</th>
          <th>用户姓名</th>
          <th>邮箱</th>
          <th>注册时间</th>
          <th>用户身份</th>
          <th>账号状态</th>
          <th>操作</th>
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
              class="btn btn-danger btn2 "

              @click="logoff(user.loginID)"
              v-if="user.status"
            >
              注销
            </button>
            <button
              type="button"
              class="btn btn-success btn2 "
              @click="promotion(user.loginID,user.role)"
              v-if="!user.role && user.status"
            >
              经理
            </button>
            <button
              type="button"
              class="btn btn-warning btn2 "
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
          :class="[page+1 == currentPage? 'btn btn-default btn2 active':'btn btn-default btn2']"
          v-for="(page, num) in page"
          :key="num"
          @click="to(page+1)"
        >
          {{ page + 1 }}
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
        <span class="kk">共{{pages.length}}页</span>
      </div>
      </div>
      
    </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import { MessageBox } from 'element-ui';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
export default {
  name: "Manage",
  data() {
    return {
      users: [],
      total: 0,
      amount: 5,
      currentPage: 1,
      currentPageUsers: [],
      pages: [],
      page:[],
      localPage:1,
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
        active:'',
      },
    };
  },
  methods: {
    regain() {
      this.$router.push("/");
    },
    logoff(loginID) {
      MessageBox.confirm('将注销该用户','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
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
            this.pages = [];
            this.users = list.data;
            this.total = this.users.length;
            this.pageList();
            this.getLocalPage();
            this.getPageUsers();
          })
          .catch((err) => {
            console.log(err);
          });
       
      }).catch((err) => {
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
          this.pages = [];
          this.users = list.data;
          this.total = this.users.length;
          this.pageList();
          this.getLocalPage();
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
          this.pages = [];
          this.users = list.data;
          this.total = this.users.length;
          this.pageList();
          this.getLocalPage();
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
        this.getLocalPage();
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
  width: 5%;
  cursor: pointer;
}
.manageform {
  padding-top: 50px;
  width: 90%;
  margin: auto;
}
h2 {
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
  background-color: rgb(255, 255, 255,0.6);
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
  width: 30px;
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
.active {
   background: #17a2b8;
   border: 1px solid #17a2b8;
   color: #fff;
 }
.select{
  margin-left: 10px;
}
#sub{
  background-color: rgb(68, 226, 136);
}
</style>