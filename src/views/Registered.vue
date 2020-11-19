<template>
  <div class="registered">
    <h3 id="head">账号注册</h3>
    <div class="link-top"></div>
    <div class="container">
      <table class="tb">
        <tr>
          <td class="td">登录ID：</td>
          <td><input type="text" name="" class="inputlength" /></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>姓名：</td>
          <td><input type="text" name="" class="inputlength" /></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>邮箱：</td>
          <td><input type="text" name="" class="inputlength" /></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>输入密码：</td>
          <td><input type="text" name="" class="inputlength" /></td>
        </tr>
        <tr>
          <td class="td"><span class="star">*</span>确认密码：</td>
          <td><input type="text" name="" class="inputlength" /></td>
        </tr>
      </table>

      <br />
      <button v-on:click="register">注册</button>

      <!-- <p v-on:click="ToLogin">已有账号？马上登录</p> -->
      <br />
      <p>
        <router-link to="/login">已有账号？马上登录</router-link>
      </p>
      <br />
      <!-- <router-link to="/">返回</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Registered", //注册
};
</script>

<style scoped>
#head {
  margin-bottom: 20px;
  margin-left: 20px;
}
.link-top {
  width: 100%;
  height: 1px;
  border-top: dashed black 1px;
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
}

.td {
  text-align: right;
}

.star {
  color: red;
}
.tb {
  padding: 0;
  height: 120px;
  margin: 0px auto;
  width: 500px;
  border: none;
  text-align: center;
}
.registered {
  background: #e4c9e4;
  height: 100%;
  width: 100%;
  position: absolute;
}
.container {
  text-align: center;
  margin-top: 100px;
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

span {
  cursor: pointer;
}

span:hover {
  color: #41b883;
}
</style>
