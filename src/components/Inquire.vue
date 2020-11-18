<template>
  <div id="Inquire_body">
    <h3 id="head">Issue查询</h3>
    <div class="link-top"></div>
    <br />
    <br />
    <div class="table_all">
      <table class="table table-hover" >
        <tbody class="table_boay">
          <tr class="align">
            <td scope="row">
              Issue NO <input type="number" maxlength="30" />
            </td>
            <td>
              Issue 状态 
                <select name="status" id="select">
                  <option class="form-control"></option>
                  <option class="form-control">待修改</option>
                  <option class="form-control">待验证</option>
                  <option class="form-control">已关闭</option>
                </select>
            </td>
            <td>创建时间<input type="date"> 至 <input type="date" ></td>
          </tr>
          <tr class="align">
            <td scope="row" id="create">
              创建人 <input type="text" maxlength="30" :value="createName"/>
            <td id="modify">
              修改人 <input type="text" maxlength="30" :placeholder="modifierName"/>
            </td>
            <td>修改时间<input type="date"> 至 <input type="date" ></td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div id="button">
      <button type="button" class="btn btn-info" @click="inquire">查询</button>
      <button type="button" class="btn btn-default">清空</button>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Inquire", //查询
  data(){
    return {
      issueID : '',
      issueList: [],
      createName: '',
      modifierName: ''
    }
  },
  created() {
    const url = "/json/users.json";
    axios({
      method: "get",
      url: url,
    })
      .then((data) => {
        this.issueList = data.data
        this.modifierName = this.issueList[1].username
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    inquire: function(){
      this.issueID = this.issueList[1].loginID
      this.createName = this.issueList[1].role
      this.modifierName = this.issueList[1].username
    }
  }
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
#Inquire_body {
  background-color: #E4C9E4;
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
#select{
  width: 174px;
  height: 30px;
}
#modify {
  padding-left: 38px;
}
.align{
  padding-left: 50px;
}
#button{
  margin-top: 20px;  text-align:center;
}
#button button{
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
.table_all{
  margin: 20px;
  margin-right: 60px;
  padding-left: 100px;
}

</style>
