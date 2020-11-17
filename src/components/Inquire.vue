<template>
  <div id="Inquire_body">
    <h2 id="head">Issue查询</h2>
    <div class="link-top"></div>
    <br />
    <br />
    <table class="table table-hover" >
      <tbody class="table_boay">
        <tr class="align">
          <td scope="row">
            Issue NO <input type="text" />
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
          <td>修改时间<input type="date"> 至 <input type="date" ></td>
        </tr>
        <tr class="align">
          <td scope="row" id="create">
            创建人 <input type="text" />
          <td id="modify">
            修改人 <input type="text" />
          </td>
          <td>修改时间<input type="date"> 至 <input type="date" ></td>
        </tr>
      </tbody>
    </table>
    <div id="button">
      <button type="button" class="btn btn-info">查询</button>
      <button type="button" class="btn btn-default">清空</button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Inquire", //查询
};
</script>

<style scoped>
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
  padding-left: 135px;
}
#select{
  width: 182px;
  height: 30px;
}
#modify {
  padding-left: 145px;
}
.align{
  padding-left: 50px;
}
#button{
  margin: 20px;  text-align:center
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
td {
  padding-left: 120px;
}
</style>
