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
            <input type="text" class="form-control" placeholder="" />
          </td>
          <td>
            <input type="text" class="form-control" placeholder="" />
          </td>
          <td>
            <input type="text" class="form-control" placeholder="" />
          </td>
          <td>
            <select class="form-control">
              <option>最高</option>
              <option>较高</option>
              <option>一般</option>
              <option>低</option>
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
            <input type="text" class="form-control" placeholder="" />
          </td>
          <td>
            <input type="text" class="form-control" placeholder="" />
          </td>
          <td></td>
        </tr>
      </table>
      <h5>重现步骤</h5>
      <textarea class="form-control" rows="3"></textarea>
      <h5>指派修改人</h5>
      <input type="text" class="form-control" placeholder="" />

      <button type="submit" class="btn btn-default btn-lg">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Create", //创建新Issue
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
.tle{
    font-size: 50px;
}
h5{
    padding-top: 50px;
    font-weight: bold;
}
</style>