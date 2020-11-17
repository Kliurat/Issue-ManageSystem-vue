<template>
  <div class="manage">
    <h5>查询</h5>
    <hr />
    <form class="form-inline">
      <div class="form-group">
        <label for="userId">用户ID</label>
        <input type="text" class="form-control" id="userId" placeholder="" />
      </div>
      <div class="form-group">
        <label for="name">用户姓名</label>
        <input type="text" class="form-control" id="name" placeholder="" />
      </div>
      <div class="btn">
        <button class="btn btn-default" id="sub" type="submit">查询</button>
        <button class="btn btn-default" id="reset" type="reset">清空</button>
      </div>
    </form>
    <h5>用户信息</h5>
    <hr />
    <table class="table table-bordered">
      <tr>
        <td>序号</td>
        <td>用户ID</td>
        <td>用户姓名</td>
        <td>邮箱</td>
        <td>注册时间</td>
        <td>用户身份</td>
        <td>账号状态</td>
        <td>操作</td>
      </tr>
      <tr v-for="(user, index) in users" :key="index">
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
      </tr>
    </table>
    
  </div>
</template>

<script>
export default {
  name: "Manage",
  data() {
    return {
      users: [
        {
            id:123,
            name: "gry",
        },
        {
            id:123,
            name: "gry",
        },
        {
            id:123,
            name: "gry",
        },
      ],
    };
  },
};
</script>

<style scoped>
h5 {
  padding-top: 50px;
}
.form-inline {
  padding-top: 50px;
  width: 50%;
  margin: auto;
}
.form-group {
  padding-right: 20%;
}
.btn {
  margin: 20px 180px 0px auto;
}
</style>