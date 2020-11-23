<template>
  <div class="registered">

    账号注册
    <hr />
    <button type="button" class="back" @click="gotoback">返回</button>

    <div class="container">
      <table class="tb">
        <tr>
          <td class="td">登录ID：</td>

          <td><input type="text" name="" ref="ID" class="inputlength" /></td>
          <td></td>
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
          <td><span class="err" v-show="emailFormat">邮箱格式错误</span></td>
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
    register: function () {
       const url = this.globalHttpUrl + "register/user";
      let ID =this.$refs.ID.value;
      let password = this.$refs.password.value;
      let ensurePassword = this.$refs.ensurePassword.value;
      let name =this.$refs.name.value;
      let email =this.$refs.em.value;
      if (ID==""||password == ""||ensurePassword == ""||name == ""||email == ""||this.passwordFormat||this.emailFormat||this.newPassword) {
        alert("请正确填写完整");
      } else {
        
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
          this.$store.commit("setToken", "true");
          this.$store.commit("setUser", this.user);
          this.$router.replace("/");
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
    gotoback: function () {
      this.$router.replace("/");
    },
  },

};
</script>

<style scoped>


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
.registered {

  background: plum;

  height: 100%;
  width: 100%;
  position: absolute;
}

p {
  margin-left: 500px;
}
.container {
  margin-left: 130px;
  margin-top: 100px;
}
.back {
  width: 70px;

  background: blue;
  color: black;
  border-radius: 10px;
  text-align: center;

  padding: 0px;
  margin-left: 0px;
  border: none;
}
.back:hover {
  background-color: rgb(1, 1, 170);
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
  border: none;
  background-color: blue;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}

</style>

