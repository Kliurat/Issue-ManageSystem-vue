<template>
  <div class="create">
    <form action="" method="post" class="form">
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
          ref="title"
          maxlength="80"
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
            />
          </td>
          <td>
            <input
              type="date"
              class="form-control"
              ref="createDate"
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              placeholder=""
              ref="issueType"
              maxlength="30"
            />
          </td>
          <td>
            <select class="form-control" ref="priority" id="sel">
              <option value="1">最高</option>
              <option value="2">较高</option>
              <option value="3" selected>一般</option>
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
              ref="influentVersion"
            />
          </td>
          <td>
            <input
              type="date"
              class="form-control"
              placeholder="请输入时间"
              ref="planModifyTime"
              required="required"
              @change="checkTime($event)"
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
            />
          </td>
          <td></td>
        </tr>
      </table>
      <h5>指派修改人</h5>
      <input
        id="modifyUser"
        type="text"
        list="userlist"
        class="form-control"
        ref="modifyPersonID"
        @change="check($event)"
        placeholder=""
      />
      <h5>重现步骤</h5>
      <textarea
        class="form-control"
        rows="3"
        ref="reStep"
        maxlength="2000"
      ></textarea>
      <div>
      <h5>解决方案</h5>
      <textarea
        class="form-control"
        rows="3"
        ref="reStep"
        maxlength="2000"
      ></textarea>
      </div>
      <datalist id="userlist">
        <option
          v-for="(user, index) in user"
          :key="index"
          :value="user.loginID"
          v-text="'姓名:' + user.username"
        ></option>
      </datalist>
      <span v-show="visit">该修改人不存在或输入错误,请输入修改人ID</span>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "showDeatail", //创建新Issue
  props: {
      
  },
  data() {
    return {
      createDate: new Date(),
      user: [],
      visit: false,
      globalHttpUrl: this.COMMON.httpUrl,
      data: this.$route.params.data,
    };
  },
    created() {
        // alert("qweer"+this.$route.params.data)
        const url = this.globalHttpUrl + "selectAll/user";
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
  methods: {
      shouwwwww(){
          alert(this.data);
      },
    
    regain() {
      this.$router.replace("/");
    },
    checkTime(event) {
      if (this.createDate > event.target.value) {
        alert("计划修改时间输入错误！！！");
        event.target.value = "";
      }
    },
    check(event) {
      let i;
      for (i = 0; i < this.user.length; i++) {
        if (event.target.value == this.user[i].loginID) break;
      }
      if (i == this.user.length) this.visit = true;
      else this.visit = false;
    },
    submit() {
      if (
        this.$refs.planModifyTime.value != "" &&
        this.$refs.title.value != "" &&
        this.$refs.influentVersion.value != "" &&
        this.$refs.issueType.value != "" &&
        this.$refs.modifyPersonID.value != "" &&
        this.$refs.reStep.value != ""
      ) {
        const url = this.globalHttpUrl + "issue";
        axios({
          method: "post",
          url: url,
          data: this.$qs.stringify({
            title: this.$refs.title.value,
            issueType: this.$refs.issueType.value,
            priority: this.$refs.priority.value,
            influentVersion: this.$refs.influentVersion.value,
            planModifyTime: this.$refs.planModifyTime.value,
            reStep: this.$refs.reStep.value,
            modifyPersonID: this.$refs.modifyPersonID.value,
          }),
        })
          .then((data) => {
            let result = data.data;
            if (result.status == 200) {
              alert(result.msg);
              this.regain();
            } else {
              alert(result.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Issue信息输入不完整!!!!");
      }
    },
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
#sel {
  width: 82px;
}
</style>