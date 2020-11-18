<template>
  <div class="create">
    <form class="form">
      <span class="title">Issue题目</span>
      <input type="text" class="tle" placeholder="" />

      <h5>基本信息</h5>
      <hr />
      <table>
        <tr>
          <td>Issue No</td>
          <td>创建时间</td>
          <td>Issue类型</td>
          <td>Issue等级</td>
        </tr>
        <tr>
          <td>
            <input type="text" class="form-control" placeholder="" disabled />
          </td>
          <td>
            <input
              type="date"
              class="form-control"
              v-model="createDate"
              disabled
            />
          </td>
          <td>
            <input type="text" class="form-control" placeholder="" />
          </td>
          <td>
            <select class="form-control">
              <option value="最高">最高</option>
              <option value="较高">较高</option>
              <option value="一般">一般</option>
              <option value="低">低</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>影响版本</td>
          <td>计划修改时间</td>
          <td>实际完成时间</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <input type="text" class="form-control" placeholder="" />
          </td>
          <td>
            <input type="date" class="form-control" />
          </td>
          <td>
            <input type="date" class="form-control" />
          </td>
          <td></td>
        </tr>
      </table>
      <h5>重现步骤</h5>
      <textarea class="form-control" rows="3"></textarea>
      <h5>指派修改人</h5>
      <input id="modifyUser" type="text" list="userlist" />
      <datalist id="userlist">
        <option v-for="(user, index) in user" :key="index">
          {{ user.loginID + user.username }}
        </option>
      </datalist>
      <br />
      <button type="button" class="btn btn-default btn-lg">提交</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Create", //创建新Issue
  data() {
    return {
      createDate: new Date(),
      user: [],
    };
  },

  methods: {
    formatDate(val) {
      let date = new Date(val);
      let y = date.getFullYear();
      let M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      this.createDate = y + "-" + M + "-" + d;
    },
  },
  created() {
    const url = "/json/modifyUser.json";
    axios({
      method: "get",
      url: url,
    })
      .then((data) => {
        this.user = data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.formatDate(this.createDate);
  },
};
</script>

<style scoped>
.form {
  padding-top: 50px;
  width: 50%;
  margin: auto;
}
td {
  padding-right: 30px;
}
.title {
  font-size: 50px;
  color: rgb(211, 35, 182);
}
.tle {
  outline: 0;
  font-size: 50px;
}
.tie:focus {
  border-style: solid;
  border-color: #03a9f4;
  box-shadow: 0 0 5px #03a9f4;
}
h5 {
  padding-top: 50px;
  font-weight: bold;
}
</style>