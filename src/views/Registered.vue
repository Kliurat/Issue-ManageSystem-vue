<template>
  <div class="registered">
    <h1 class="home">GBA Issue管理系统</h1>
    <h2 class="head">注册</h2>
    <div class="link-top"></div>
    <button type="button" class="back btn btn-default" @click="gotoback">返回</button>
    <div class="container">
      <table class="tb">
        <tr>
          <td class="td"><span class="star">*</span>登录ID：</td>

          <td><input type="text" name="" ref="ID" class="inputlength" @change="FormatID($event)"/></td>
          <td><span v-show="IdFormat" class="star">输入格式不正确</span></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>姓名：</td>
          <td>
            <input type="text" name="" class="inputlength" ref="name" maxlength="30" />
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>邮箱：</td>
          <td>
            <input type="email" name="" class="inputlength" ref="em" maxlength="30" @change="checkEmail($event)"/>

          </td>
          <td><span class="err" v-show="emailFormat" >邮箱格式错误</span></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>输入密码：</td>
          <td>
            <input
              type="password"
              name=""
              ref="password"
              class="inputlength"
              maxlength="30"
              @change="checkPassword($event)"
            />
          </td>
          <td><span class="err" v-show="passwordFormat">密码格式错误</span></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>确认密码：</td>
          <td>
            <input
              type="password"
              name=""
              ref="ensurePassword"
              class="inputlength"
              maxlength="30"
              @change="ensurePwd($event)"
            />
          </td>
          <td><span class="err" v-show="newPassword">密码不一致</span></td>

        </tr>
      </table>

      <br />
      <button v-on:click="register">注册</button>


      <br />
      <p>
        <router-link to="/login">已有账号？马上登录</router-link>
      </p>
      <br />


    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Registered", //注册

  data() {
    return {
      passwordFormat: false,
      newPassword: false,
      emailFormat:false,
      IdFormat:false,
      globalHttpUrl: this.COMMON.httpUrl,
      user: {
            username: "",
            loginID: "",
            email: "",
            role: "",
        },
    };
  },
  methods: {
    FormatID(event){
      let str = /[\s*]/;
      if(str.test(event.target.value)){
        this.IdFormat=true;
      }else{
        this.IdFormat=false;
      }
    },
    checkPassword(event) {
      let str = event.target.value;
      let az = /[a-z]/;
      let AZ = /[A-Z]/;
      
      let patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/;
      if (az.test(str) && AZ.test(str) && patrn.test(str)&&(event.target.value.length>=8)) {
        this.passwordFormat = false;
      } else {
        this.passwordFormat = true;
      }
    },
    checkEmail(event){
       let reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"); 
      if(reg.test(event.target.value)){
       
        this.emailFormat=false;
      }else{
        this.emailFormat=true;
      }
    },
    ensurePwd($event){
      let password = this.$refs.password.value;
      
       if (password != event.target.value) {
          this.newPassword = true;
        } else {
          this.newPassword = false;
          }
    },
    register() {
       const url = this.globalHttpUrl + "register/user";
      let ID =this.$refs.ID.value;
      let password = this.$refs.password.value;
      let ensurePassword = this.$refs.ensurePassword.value;
      let name =this.$refs.name.value;
      let email =this.$refs.em.value;
      if (ID=="") {
        alert("请输入登陆ID");
      }else if(password == ""){
        alert("请输入密码");
        
      }else if(ensurePassword == ""){
        alert("请输入确认密码");
        
      }else if(name == ""){
        alert("请输入姓名");
        
      }else if(email == ""){
        alert("请输入邮箱");
        
      }else if(this.passwordFormat){
        alert("密码格式错误");
        
      }else if(this.emailFormat){
        alert("邮箱格式错误");
        
      }else if(this.newPassword){
        alert("两次密码不一致");
        
      }else if(this.IdFormat){
        alert("登陆ID格式有误");
        
      }
      else{
      alert("注册成功");
      axios({
      method: "post",
      url: url,
      data:this.$qs.stringify({
        loginID:ID,
        password:password,
        username:name,
        email:email,
      }),
    })
      .then((data) => {
        if(data.data==1){
          this.user.loginID=ID;
          this.user.username=name;
          this.user.email=email;
          this.user.role=0;
          window.sessionStorage.setItem("logined",true);
          this.$store.commit("setToken", "true");
          this.$store.commit("setUser", this.user);
          this.$router.push("/");
        }
        if(data.data==-1){
          alert("该登录ID已被注册");
        }
        if(data.data==0){
          alert("注册失败");
        }
      })
      .catch((err) => {
        console.log(err);
      });
        }
      
    },
    gotoback() {
      this.$router.back(-1);
    },
    registration(){

    }
  },

};
</script>

<style scoped>
.head {
  margin-bottom: 20px;
  margin-left: 20px;
  text-align: center;
}
.link-top {
  width: 100%;
  height: 1px;
  border-top: dashed black 1px;
}

.inputlength {
  width: 400px;
  height: 30px;
  border-radius: 10px;
  border: none;

  margin-left: 0px;
}
.err {
  width: 200px;
}

.td {
  width: 150px;

  text-align: right;
}

.star {
  color: red;
}
.tb {
  padding: 0;
  height: 120px;
  margin: 0px auto;

  width: 700px;

  border: none;
  text-align: center;
}

p {
  margin-left: 500px;
}
.container {
  margin: auto;
  margin-top: 100px;
}
.back {
  width: 70px;
  margin-top: 20px;
  background: white;
  color: black;
  border-radius: 10px;
  text-align: center;
  border: 1px solid rgb(58, 184, 241);
  padding: 0px;
  margin-left: 10px;
}
span {
  text-align: center;
}
input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}


button {
  border-radius: 10px;
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  background-color: blue;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}
h1 {
  height: 50px;
  width: 100%;
  text-align: center;
  top: 0;
}
.registration{
  float: right;
  border-radius: 10px;
  margin-right: 20px;
  margin-top: -40px;
  background-color: white;
}
</style>

