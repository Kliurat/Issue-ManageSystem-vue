<template>
  <div class="modify">
    修改信息
    <hr />
    <button type="button" class="back" @click="gotoback">返回</button>
    <div class="container">
      <table class="tb">
        <tr>
          <td class="td">登录ID：</td>
          <td><input type="text" name="" class="inputlength" ref="ID" disabled /></td>
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
            <input type="text" name="" class="inputlength" ref="em" maxlength="30" />
          </td>
          <td></td>
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
            />
          </td>
          <td><span class="err" v-show="newPassword">密码不一致</span></td>
        </tr>
      </table>

      <br />
      <button v-on:click="register">修改</button>
      <br />

      <br />
    </div>
  </div>
</template>


<script>
export default {
  name: "Modify", //修改
  data() {
    return {
      passwordFormat: false,
      newPassword: false,
    };
  },
  methods: {
    checkPassword(event) {
      let str = event.target.value;
      let az = /[a-z]/;
      let AZ = /[A-Z]/;
      let patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/;
      if (az.test(str) && AZ.test(str) && patrn.test(str)) {
        this.passwordFormat = false;
      } else {
        this.passwordFormat = true;
      }
    },
    register: function () {
      var a = this.$refs.password.value;
      var b = this.$refs.ensurePassword.value;
      
      var d =this.$refs.name.value;
      var e =this.$refs.em.value;
      if (a == ""|b == ""|d == ""|e == "") {
        alert("请填写完整");
      } else {
        if (a != b) {
          this.newPassword = true;
        } else {
          this.newPassword = false;
        }
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
.modify {
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