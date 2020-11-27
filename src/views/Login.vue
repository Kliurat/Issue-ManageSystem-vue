<template>
  <div id="login">
    <div class="background">
      <img src="/pic/10.jfif" width="100%" height="100%" alt="" />
    </div>
    <h1 class="home">GBA Issue管理系统</h1>
    <h2 class="head">登录</h2>
    <div class="link-top"></div>
    <div class="login_container">
      <table class="tb">
        <tr>
          <td class="world"><span class="star">*</span>登录ID：</td>
          <td>
            <input
              type="text"
              value=""
              class="inputlength"
              ref="ID"
              maxlength="30"
            />
          </td>
        </tr>
        <tr>
          <td class="world"><span class="star">*</span>密码：</td>
          <td>
            <input
              type="password"
              class="inputlength"
              ref="password"
              maxlength="30"
            />
          </td>
        </tr>
      </table>
    </div>
    <br />
    <div id="btnBack">
      <input type="button" v-on:click="login" class="submit" value="登录" />
      <button type="button" class="back btn btn-default" @click="gotoback">
        返回
      </button>
    </div>
    <br />
    <p>
      <router-link to="/registered">没有账号？马上注册</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login", //登陆
  data() {
    return {
      globalHttpUrl: this.COMMON.httpUrl,
    };
  },
  methods: {
    login: function() {
      var a = this.$refs.password.value;
      var b = this.$refs.ID.value;
      if ((a == "") | (b == "")) {
        const h = this.$createElement;
        this.$message({
          message: h('p', null, [
            h('i', { style: 'color: red' }, '请填写完整')
          ])
        });
      } else {
        const url = this.globalHttpUrl + "login";
        axios({
          method: "post",
          url: url,
          xhrFields: {
            withCredentials: true,
          },
          data: this.$qs.stringify({
            loginId: b,
            password: a,
          }),
        })
          .then((data) => {
            if (data.data.status == 200) {
              window.sessionStorage.setItem("logined", true);
              this.$store.commit("setToken", "true");
              if(data.data.data.role==0){
                this.$store.commit("setRole", "user");
              }
              if(data.data.data.role==1){
                this.$store.commit("setRole", "manage");
              }
              if(data.data.data.role==null){
                this.$store.commit("setRole", "Admin");
              }
              this.$store.commit("setUser", data.data.data);
              this.$message("欢迎登录")
              this.$router.replace("/");
            } else {
                const h = this.$createElement;
                this.$message({
                  message: h('p', null, [
                    h('i', { style: 'color: red' }, data.data.msg)
                  ])
                });
            }  
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    gotoback: function() {
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
.world {
  text-align: right;
}

.star {
  color: red;
}

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

.login_container {
  margin-top: 100px;

  text-align: center;
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
}

.inputlength {
  width: 400px;
  height: 30px;
  border-radius: 10px;
  border: none;
}

.tb {
  padding: 0;
  height: 120px;
  margin: 0px auto;
  width: 500px;
  border: none;
  text-align: center;
}
p {
  color: red;
  text-align: center;
}
#btnBack {
  width: 30%;
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

span {
  cursor: pointer;
}

span:hover {
  color: #41b883;
}
.background {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: fixed;
}
#login {
  width: 100%;
  height: 100%;
  background: plum;
  position: absolute;
}
h1 {
  height: 70px;
  width: 100%;
  text-align: center;
  top: 0;
}
</style>
