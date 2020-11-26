<template>
  <div class="registered">
    <h1 class="home">GBA Issue管理系统</h1>
    <h2 class="head">注册</h2>
    <div class="link-top"></div>
    <div class="container">
      <table class="tb">
        <tr>
          <td class="td"><span class="star">*</span>登录ID：</td>

          <td>
            <input
              type="text"
              name=""
              ref="ID"
              class="inputlength"
              @change="FormatID($event)"
            />
          </td>
          <td><span v-show="IdFormat" class="star">输入格式不正确</span></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>姓名：</td>
          <td>
            <input
              type="text"
              name=""
              class="inputlength"
              ref="name"
              maxlength="30"
            />
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>邮箱：</td>
          <td>
            <input
              type="email"
              name=""
              class="inputlength"
              ref="em"
              maxlength="30"
              @change="checkEmail($event)"
            />
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
          <td>
            <span class="err" v-show="passwordFormat">{{
              passwordPrompt
            }}</span>
          </td>
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
      <div id="btnBack">
        <button v-on:click="register" class="submit">注册</button>
        <button type="button" class="back btn btn-default" @click="gotoback">
          返回
        </button>
      </div>
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
      passwordPrompt: "",//密码格式提示
      passwordFormat: false,//密码格式是否正确
      newPassword: false,//第二次密码是否一致
      emailFormat: false,//邮箱格式是否正确
      IdFormat: false,//ID格式是否正确
      globalHttpUrl: this.COMMON.httpUrl,//连接地址
      user: {//用户属性
        username: "",
        loginID: "",
        email: "",
        role: "",
      },
    };
  },
  methods: {
    FormatID(event) {//判断ID格式
      let str = /[\s*]/;
      if (str.test(event.target.value)) {
        this.IdFormat = true;
      } else {
        this.IdFormat = false;
      }
    },
    checkPassword(event) {//判断密码格式
      let str = event.target.value;
      let az = /[a-z]/;
      let AZ = /[A-Z]/;
      let patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/;

      if (az.test(str)) {
        if (AZ.test(str)) {
          if (patrn.test(str)) {
            if (event.target.value.length >= 8) {
              this.passwordFormat = false;
            } else {
              this.passwordPrompt = "密码不足八位";
              this.passwordFormat = true;
            }
          } else {
            this.passwordPrompt = "密码没包含特殊字符";
            this.passwordFormat = true;
          }
        } else {
          this.passwordPrompt = "密码没包含大写字母";
          this.passwordFormat = true;
        }
      } else {
        this.passwordPrompt = "密码没包含小写字母";
        this.passwordFormat = true;
      }
    },
    checkEmail(event) {//判断邮箱格式
      let reg = new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      );
      if (reg.test(event.target.value)) {
        this.emailFormat = false;
      } else {
        this.emailFormat = true;
      }
    },
    ensurePwd($event) {//判断第二次密码格式
      let password = this.$refs.password.value;

      if (password != event.target.value) {
        this.newPassword = true;
      } else {
        this.newPassword = false;
      }
    },
    register() {//点击注册判断条件
      const url = this.globalHttpUrl + "register/user";
      let ID = this.$refs.ID.value;
      let password = this.$refs.password.value;
      let ensurePassword = this.$refs.ensurePassword.value;
      let name = this.$refs.name.value;
      let email = this.$refs.em.value;
      if (
        ID == "" ||
        password == "" ||
        ensurePassword == "" ||
        name == "" ||
        email == "" ||
        this.passwordFormat ||
        this.emailFormat ||
        this.newPassword ||
        this.IdFormat
      ) {
        alert("请正确填写完整");
      } else {
        axios({
          method: "post",
          url: url,
          data: this.$qs.stringify({
            loginID: ID,
            password: password,
            username: name,
            email: email,
          }),
        })
          .then((data) => {
            if (data.data == 1) {
              this.user.loginID = ID;
              this.user.username = name;
              this.user.email = email;
              this.user.role = 0;
              window.sessionStorage.setItem("logined", true);
              this.$store.commit("setToken", "true");
              this.$store.commit("setUser", this.user);
              this.$router.push("/");
            }
            if (data.data == -1) {
              alert("该登录ID已被注册");
            }
            if (data.data == 0) {
              alert("注册失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    gotoback() {//返回主页
      this.$router.back(-1);
    },
    registration() {},
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
  margin-top: -45px;
  float: right;
  width: 70px;
  height: 40px;
  background: #17a2b8;
  color: white;
  border-radius: 10px;
  border: 1px solid rgb(58, 184, 241);
  font-size: 18px;
  line-height: 18px;
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
.registration {
  float: right;
  border-radius: 10px;
  margin-right: 20px;
  margin-top: -40px;
  background-color: white;
}
#btnBack{
  width: 40%;
  margin: 10px auto;
}
.submit {
  display: block;
  width: 180px;
  height: 40px;
  line-height: 25px;
  border-radius: 20px;
  margin: 0 auto;
  border: none;
  background-color: #fff;
  border: 1px solid rgb(58, 184, 241);
  color: black;
  font-size: 25px;
  margin-bottom: 5px;
}
</style>
