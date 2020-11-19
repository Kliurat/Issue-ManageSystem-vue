<template>
  <div id="Inquire_body">
    <h3 id="head">Issue查询</h3>
    <div class="link-top"></div>
    <br />
    <br />
    <div class="table_all">
      <table class="table table-hover">
        <tbody class="table_boay">
          <tr class="align">
            <td scope="row">Issue NO <input type="number" maxlength="30" ref="Issue_NO"/></td>
            <td>
              Issue 状态
              <select name="status" id="select" ref="select">
                <option class="form-control" selected="selected"></option>
                <option class="form-control">待修改</option>
                <option class="form-control">待验证</option>
                <option class="form-control">已关闭</option>
              </select>   
            </td>
            <td>创建时间<input type="date" ref="create_time"/> 至 <input type="date" ref="create_time1"/></td>
          </tr>
          <tr class="align">
            <td scope="row" id="create">
              创建人 <input type="text" maxlength="30" ref="create"/>
            </td>

            <td id="modify">
              修改人
              <input type="text" maxlength="30" :placeholder="modifierName" ref="modify"/>
            </td>
            <td>修改时间<input type="date" ref="modify_time"/> 至 <input type="date" ref="modify_time1"/></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="button">
      <button type="button" class="btn btn-info" @click="inquire">查询</button>
      <button type="button" class="btn btn-default" @click="clear">清空</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Inquire", //查询
  data() {
    return {
      issueID: "",
      issueList: [],
      arrayList: [],
      createName: "",
      modifierName: "",
    };
  },
  created() {
    const url = "/json/users.json";
    axios({
      method: "get",
      url: url,
    })
      .then((data) => {
        this.arrayList = data.data;
        this.issueList = this.arrayList;
        // console.log(this.issueList)
        this.modifierName = this.arrayList[1].username;
        
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    inquire: function() {
      this.issueList = this.arrayList;
        // console.log(result)
        let partInfo = this.issueList;
        // console.log(partInfo)
        this.$emit("callBackInfo", this.issueList);
        // console.log(50050)
        
      this.issueID = this.issueList[1].loginID;
      this.createName = this.issueList[1].role;
      this.modifierName = this.issueList[1].username;
    },
    clear: function() {
      // this.issueList = [];
      // this.issueID = [];
      // this.createName = [];
      // this.modifierName = [];
      this.$refs.Issue_NO.value = ''
      this.$refs.create.value = ''
      this.$refs.modify.value = ''
      this.$refs.create_time.value = ''
      this.$refs.create_time1.value = ''
      this.$refs.modify_time.value = ''
      this.$refs.modify_time1.value = ''
      this.$refs.select.value = ''
      this.modifierName = null
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
#Inquire_body {
  background-color: #e4c9e4;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.link-top {
  width: 100%;
  height: 1px;
  border-top: dashed black 1px;
}
.page-header {
  left: 50px;
  position: relative;
}
#create {
  padding-left: 28px;
}
#select {
  width: 174px;
  height: 30px;
}
#modify {
  padding-left: 38px;
}
.align {
  padding-left: 50px;
}
#button {
  margin-top: 20px;
  text-align: center;
}
#button button {
  margin: 20px;
  width: 100px;
}
.table_boay {
  margin: 30px;
}
.btn-default {
  background-color: white;
}
#head {
  margin-bottom: 20px;
  margin-left: 20px;
}
.table_all {
  margin: 20px;
  margin-right: 60px;
  padding-left: 100px;
}
</style>
