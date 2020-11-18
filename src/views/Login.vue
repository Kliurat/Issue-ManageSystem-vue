<template>
  <div id="login">
    <h2 id="login_head">登陆</h2>
    <div class="link-top"></div>
    <form class="login_form">
        <div class="from-group">
            <label for="login_id">系统ID：</label>
            <input type="text" id="login_id">
        </div>
        <div class="from-group">
            <label for="login_password">输入密码：</label>
            <input type="password" id="login_password">
        </div>
        <button type="button" class="btn btn-info">登陆</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login", //登陆
};
</script>

<style scoped>
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
