<template>
  <div id="login">
    <h3 id="head">登录</h3>
    <div class="link-top"></div>
    <router-link to="/" class="back">返回</router-link>
    <div class="login_container">
      <table class="tb">
        <tr >
          <td class="world"><span class="star">*</span>输入ID：</td>
          <td><input type="text" value="" class="inputlength" /></td>
        </tr>
        <tr >
          <td class="world"><span class="star">*</span>输入密码：</td>
          <td><input type="password" class="inputlength" /></td>
        </tr>
      </table>
      

      <br />
      <input type="submit" class="submit" value="登录" />
      <br />
      <p>
        <router-link to="/registered">没有账号？马上注册</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login", //登陆
};
</script>

<style scoped>
.link-top {
  width: 100%;
  height: 1px;
  border-top: dashed black 1px;
}
.world{
  text-align: right;
}

.star {
  color: red;
}
#head {
  margin-bottom: 20px;
  margin-left: 20px;
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
.back{
  text-align: right;
}
.inputlength {
  width: 400px;
  height: 30px;
  border-radius: 10px;
  border: none;
}
.tb{
  padding: 0 ;
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
#login {
    background-color: #E4C9E4;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}
#login_head {
  margin-bottom: 20px;
  margin-left: 20px;
}
.link-top {
  width: 100%;
  height: 1px;
  border-top: dashed black 1px;
}
.login_form {
    text-align: center;
    margin-top: 150px;
}
.login_form button{
    width: 200px;
    margin-top: 50px;
    border-radius: 15px;
}
.from-group{
    margin: 15px;
}
#login_id {
    margin-left: 15px;
}
</style>
</style>