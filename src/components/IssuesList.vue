<template>
  <div id="IssuesList_body">
    <h2 class="head">Issue列表</h2>
    <div class="link-top"></div>
    <div id="table_boay">
      <table class="table table-striped ">
        <thead>
          <tr>
            <th><input type="checkbox" name="" id="" /></th>
            <th>序号</th>
            <th>Issue ID</th>
            <th>Issue 标题</th>
            <th>创建人</th>
            <th>创建时间</th>
            <th>修改人</th>
            <th>Issue 状态</th>
            <th>计划完成时间</th>
            <th>实际完成时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr>
            <th scope="row"><input type="checkbox" name="" id="" /></th>
            <th>1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td><button type="button" class="btn btn-default">详情</button><button type="button" class="btn btn-default">修改</button></td>
          </tr>
          <tr>
            <th scope="row"><input type="checkbox" name="" id="" /></th>
            <th>2</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td><button type="button" class="btn btn-default">详情</button><button type="button" class="btn btn-default">修改</button></td>
          </tr>
          <tr>
            <th scope="row"><input type="checkbox" name="" id="" /></th>
            <th>3</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td><button type="button" class="btn btn-default">详情</button><button type="button" class="btn btn-default">修改</button></td>
          </tr>
          <tr>
            <th scope="row"><input type="checkbox" name="" id="" /></th>
            <th>4</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td><button type="button" class="btn btn-default">详情</button><button type="button" class="btn btn-default">修改</button></td>
          </tr>
          <tr>
            <th scope="row"><input type="checkbox" name="" id="" /></th>
            <th>5</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td><button type="button" class="btn btn-default">详情</button><button type="button" class="btn btn-default">修改</button></td>
          </tr>
          <tr>
            <th scope="row"><input type="checkbox" name="" id="" /></th>
            <th>6</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td>@xxx</td>
            <td><button type="button" class="btn btn-default">详情</button><button type="button" class="btn btn-default">修改</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="btn_body">  
      <button class="btn btn-default glyphicon glyphicon-chevron-left"></button>
      <button type="button" class="btn btn-default">1</button>
      <button type="button" class="btn btn-default">2</button>
      <button type="button" class="btn btn-default">3</button>
      <button type="button" class="btn btn-default">4</button>
      <button type="button" class="btn btn-default">5</button>
      <button type="button" class="btn btn-default">6</button>
      <button type="button" class="btn btn-default">7</button>
      <button type="button" class="btn btn-default">8</button>
      <button type="button" class="btn btn-default">9</button>
      <button class="btn btn-default glyphicon glyphicon-chevron-right"></button>
      <button type="button" class="btn btn-default">20条/页</button>
      <span> 跳至 </span>
      <input type="text" id="page">
      <span> 页 </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "IssuesList", //列表
};
</script>

<style scoped>
#IssuesList_body {
  background-color: #e4c9e4;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.head {
  margin-bottom: 20px;
  margin-left: 20px;
}
#table_boay {
  margin: 50px;
  background-color: white;
  text-align: center;
}
.link-top {
  width: 100%;
  height: 1px;
  border-top: dashed black 1px;
}
.btn-default {
  background-color: white;
}
#glyphicon-align-left{
  color: gray;
}
.btn-default{
  margin: 10px;
}
#btn_body {
  text-align: center;
}
#page {
  width: 55.484px;
  margin: 10px;
  height: 38px;
  border: 1px;
  padding: 12px;
  border-radius: 5px;
}
#tbody .btn-default {
  padding-left: 12px;
  border-radius: 10px;
  border: 1px solid rgb(58, 184, 241);
  margin: 0;
  margin-left: 10px;
}
</style>
