<template>
  <div class="modify">
    <h1 class="home">GBA Issue管理系统</h1>
    <div id="widthBody">
      <h2 class="head">修改信息</h2>
    <div class="link-top"></div>
    <button type="button" class="back" @click="gotoback">返回</button>
    <div class="container">
      <table class="tb">
        <tr>
          <td class="td">登录ID：</td>
          <td>
            <input
              type="text"
              name=""
              class="inputlength"
              ref="ID"
              :placeholder="this.$store.state.user.loginID"
              disabled
            />
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>姓名：</td>
          <td>
            <input
              type="text"
              name=""
              class="inputlength"
              ref="name"
              :value="this.$store.state.user.username"
              maxlength="30"
            />
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>邮箱：</td>
          <td>
            <input
              type="text"
              name=""
              class="inputlength"
              ref="em"
              :value="this.$store.state.user.email"
              maxlength="30"
              @change="checkEmail($event)"
            />
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>修改密码：</td>
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
              @change="check($event)"
            />
          </td>
          <td><span class="err" v-show="newPassword">密码不一致</span></td>
        </tr>
      </table>

      <br />
      <button v-on:click="update()">修改</button>
      <br />

      <br />
    </div>
    </div>
    
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Modify", //修改
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
      },
    };
  },
  methods: {
    checkPassword(event) {
      let str = event.target.value;
      let az = /[a-z]/;
      let AZ = /[A-Z]/;
      let patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/;
      if (az.test(str) && AZ.test(str) && patrn.test(str) && str.length >= 8) {
        this.passwordFormat = false;
      } else {
        this.passwordFormat = true;
      }
    },
    check(event) {
      if (this.$refs.password.value == event.target.value) {
        this.newPassword = false;
      } else {
        this.newPassword = true;
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
    update() {
      if (
        !this.emailFormat &&
        !this.newPassword &&
        !this.passwordFormat &&
        this.$refs.name.value != "" &&
        this.$refs.em.value != "" &&
        this.$refs.password.value != "" &&
        this.$refs.ensurePassword.value != ""
      ) {
        const url = this.globalHttpUrl + "update/user";
        axios({
          method: "put",
          url: url,
          // contentType: "application/json",this.$qs.stringify
          data: {
            loginID: this.$store.state.user.loginID,
            username: this.$refs.name.value,
            email: this.$refs.em.value,
            password: this.$refs.password.value,
          },
        })
          .then((data) => {
            if (data.data) {
              alert("修改成功");
              this.user.loginID = this.$store.state.user.loginID;
              this.user.username = this.$refs.name.value;
              this.user.email = this.$refs.em.value;
              this.$store.commit("setUser", this.user);
              this.$router.push("/");
            } else {
              alert("修改失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("请正确填写所有字段");
      }
    },
    gotoback: function () {
      this.$router.push("/");
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
p {
  margin-left: 500px;
}
.container {
  margin-top: 5%;
}
.back {
  width: 70px;
  color: black;
  border-radius: 10px;
  text-align: center;
  margin-left: 10px;
  margin-top: 10px;
  border: 1px solid rgb(58, 184, 241);
  background-color: white;
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
.head {
  margin-bottom: 20px;
  margin-left: 20px;
  
}
.link-top {
  width: 100%;
  height: 1px;
  border-top: dashed black 1px;
}
h1 {
  height: 50px;
  width: 100%;
  text-align: center;
  top: 0;
}
#widthBody{
  width: 90%;
  margin: auto;
}
</style>