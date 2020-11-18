<template>
  <div class="create">
    <form action="http://192.168.3.37:8081/issue" class="form">
      <span class="title" ref="title">Issue题目</span>
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
            <input
              type="text"
              class="form-control"
              placeholder="系统自动生成"
              disabled
            />
          </td>
          <td>
            <input
              type="date"
              class="form-control"
              v-model="createDate"
              ref="createDate"
              disabled
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              placeholder=""
              ref="issueType"
            />
          </td>
          <td>
            <select class="form-control" ref="priority">
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
            <input
              type="text"
              class="form-control"
              placeholder=""
              ref="influentVersion"
            />
          </td>
          <td>
            <input type="date" class="form-control" ref="planModifyTime" />
          </td>
          <td>
            <input type="date" class="form-control" disabled />
          </td>
          <td></td>
        </tr>
      </table>
      <h5>重现步骤</h5>
      <textarea class="form-control" rows="3"></textarea>
      <h5>指派修改人</h5>
      <input
        id="modifyUser"
        type="text"
        list="userlist"
        ref="modifyUser"
        @change="cheak($event)"
      />
      <datalist id="userlist">
        <option
          v-for="(user, index) in user"
          :key="index"
          :value="user.loginID"
          v-text="'姓名:' + user.username"
        ></option>
      </datalist>
      <span v-show="visit">该修改人不存在</span>
      <br />
      <button type="button" class="btn btn-default btn-lg" @click="submit()">
        提交
      </button>
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
      visit: false,
    };
  },

  methods: {
    cheak(event) {
      let i;
      for (i = 0; i < this.user.length; i++) {
        if (event.target.value == this.user[i].loginID) break;
        if (event.target.value == this.user[i].username) break;
      }
      if (i == this.user.length) this.visit = true;
    },
    submit() {},
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
    const url = "http://192.168.3.37:8081/selectAll/user";
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