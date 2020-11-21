<template>
  <div id="login">
    <div class="head">登录</div>
    <hr />
    <button type="button" class="back" @click="gotoback">返回</button>
    <div class="login_container">
      <table class="tb">
        <tr>
          <td class="world"><span class="star">*</span>输入ID：</td>
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
          <td class="world"><span class="star">*</span>输入密码：</td>
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
    <input type="button" v-on:click="login" class="submit" value="登录" />

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
    login: function () {
      var a = this.$refs.password.value;
      var b = this.$refs.ID.value;
      if ((a == "") | (b == "")) {
        alert("请填写完整");
      } else {
        const url = this.globalHttpUrl + "login";
        axios({
          method: "post",
          url: url,
          data: this.$qs.stringify({
            loginId: b,
            password: a,
          }),
        })
          .then((data) => {
            if (data.data.status == 200) {
              this.$store.commit("setToken", "true");
              this.$store.commit("setUser", data.data.data);
              this.$router.replace("/");
            } else {
              alert(data.data.msg);
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
.world {
  text-align: right;
}

.star {
  color: red;
}

.head {
  margin-right: auto;
}
#login {
  width: 100%;
  height: 100%;
  background: plum;
  position: absolute;
}
.login_container {
  margin-top: 100px;

  text-align: center;
}

.back {
  width: 70px;
  height: 30px;
  background: blue;
  color: black;
  border-radius: 10px;
  text-align: center;
  border: none;
}
.back:hover {
  background-color: rgb(1, 1, 170);
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

.submit {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  margin: 0 auto;
  border: none;
  background-color: #2769f7;

  color: black;
  font-size: 16px;
  margin-bottom: 5px;
}
.submit:hover {
  background-color: rgb(1, 1, 170);
}

span {
  cursor: pointer;
}

span:hover {
  color: #41b883;
}
</style>




