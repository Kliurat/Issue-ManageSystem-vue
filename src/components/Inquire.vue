<template>
  <div id="Inquire_body">
    <div class="page-header">
      <h3>Issue查询</h3>
    </div>
    <div class="link-top"></div>
    <br />
    <table class="table table-hover">
      <tbody>
        <tr>
          <th scope="row">
            <div>Issue NO <input type="text" /></div>
          </th>
          <td><div>Issue 状态 <input type="text" /></div></td>
          <td>Otto</td>
        </tr>
        <tr>
          <th scope="row">
            <div>创建人 <input type="text" /></div>
          </th>
          <td><div>修改人 <input type="text" /></div></td>
          <td>Thornton</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Inquire", //查询
};
</script>

<style scoped>
#Inquire_body {
  left: 0;
  top: 0;
  background-color: rgb(52, 177, 182);
  width: 100%;
  height: 100%;
  position: fixed;
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
</style>
