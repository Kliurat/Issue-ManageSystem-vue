<template>
  <div class="create">
    <form action="http://192.168.3.115:8888/issue" method="post" class="form">
      <div>
        <img
          src="/pic/return.gif"
          title="点我返回主页"
          alt="图片不存在"
          class="return"
          @click="regain()"
        />
        <span class="title">Issue题目</span>
        <input
          type="text"
          class="form-control tle"
          placeholder=""
          name="title"
        />
      </div>

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
              disabled
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              placeholder=""
              name="issueType"
            />
          </td>
          <td>
            <select class="form-control" name="priority">
              <option value="1">最高</option>
              <option value="2">较高</option>
              <option value="3">一般</option>
              <option value="4">低</option>
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
              name="influentVersion"
            />
          </td>
          <td>
            <input type="date" class="form-control" name="planModifyTime" />
          </td>
          <td>
            <input type="date" class="form-control" disabled />
          </td>
          <td></td>
        </tr>
      </table>
      <h5>重现步骤</h5>
      <textarea class="form-control" rows="3" name="reStep"></textarea>
      <h5>指派修改人</h5>
      <input
        id="modifyUser"
        type="text"
        list="userlist"
        class="form-control"
        name="modifyPersonID"
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
      <button type="submit" class="btn btn-default btn-lg">提交</button>
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
    regain() {
      this.$router.replace("/");
    },
    cheak(event) {
      let i;
      for (i = 0; i < this.user.length; i++) {
        if (event.target.value == this.user[i].loginID) break;
        if (event.target.value == this.user[i].username) break;
      }
      if (i == this.user.length) this.visit = true;
      else this.visit = false;
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
    const url = "http://192.168.3.115:8888/selectAll/user";
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
  margin: 3%;
  font-size: 50px;
  color: rgb(211, 35, 182);
}
.tle {
  padding-top: 0px;
  display: inline;
  outline: 0;
  font-size: 50px;
  width: 40%;
}

h5 {
  padding-top: 50px;
  font-weight: bold;
}
.return {
  float: left;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  cursor: pointer;
}
#modifyUser {
  width: 30%;
}
</style>