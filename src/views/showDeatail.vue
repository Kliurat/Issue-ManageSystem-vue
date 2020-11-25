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
          :placeholder="title"
          ref="title"
          maxlength="80"
          disabled
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
              disabled
              :placeholder="issueNo"
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              ref="createDate"
              disabled
              :placeholder="createDate"
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              :placeholder="issueType"
              ref="issueType"
              maxlength="30"
              disabled
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              ref="priority"
              v-model="priorityID"
              maxlength="30"
              disabled
            />
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
              :placeholder="influentVersion"
              ref="influentVersion"
              disabled
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              :placeholder="planModifyTime"
              ref="planModifyTime"
              required="required"
              disabled
            />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              disabled
              :placeholder="actualComplteTime"
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
        :placeholder="modifyPersonID"
        disabled
      />
      <h5>重现步骤</h5>
      <textarea
        class="form-control"
        rows="3"
        ref="reStep"
        maxlength="2000"
        :placeholder="reStep"
        disabled
      ></textarea>
      <div>
      <img :src="imgSrc" alt="" class="reStepImg">
      </div>
      <div v-if="isSolve">
        <h5>解决方案</h5>
        <textarea
          class="form-control"
          rows="3"
          ref="solution"
          maxlength="2000"
          :placeholder="solution"
          :disabled="isShowSolve"
        ></textarea>
        <div v-show="isShow">
          <div class="btn4" v-show="isShowBtn">
            <button
              class="btn btn-default btn3 "
              id="sub"
              type="button"
              @click="verification()"
            >
              提交验证
            </button>
          </div>
          <div class="btn4" v-show="!isShowBtn">
            <button
              class="btn btn-default btn1"
              type="button"
              ref="cancel"
              @click="cancel()"
            >
              退回修改
            </button>
            <button  class="btn btn-default btn1" id="reset" type="reset" ref="shutDown" @click="shutDown()">
              关闭
            </button>
          </div>
        </div>
        
      </div>
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
      imgSrc:"",
      user: [],
      visit: false,
      globalHttpUrl: this.COMMON.httpUrl,
      data: this.$route.params.data,
      status: this.$route.params.status,
      create: this.$route.params.create,
      modify: this.$route.params.modify,
      isShowDetail: this.$route.params.isShowDetail,
      isShow: true,
      isShowBtn: true,
      isSolve: true,
      isShowSolve:false,
      title: '',//题目
      createPersonID: '',
      issueNo: '',//
      createDate: '',
      issueType: '',
      influentVersion: '',
      planModifyTime: '',
      actualComplteTime: '',
      modifyPersonID: '',
      reStep:'',
      solution:'',
      priority: '',
      modifyPersonID:'',
      priorityID: '',
      id: 0
    };
  },
    created() {
        // alert("qweer"+this.$route.params)
        // console.log(this.data)
        this.imgSrc = this.globalHttpUrl + "file/download"
        
        const url = this.globalHttpUrl + "issue/getIssueByIssueNo";
        axios({
        method: "post",
        url: url,
        data: this.$qs.stringify({issueNo:this.data,
        status: 1}),
        })
        .then((data) => {
          // console.log(data)
          
            this.user = data.data;
            // console.log(this.user)
            this.id = this.user.id
            this.issueNo = this.user.issueNo
            this.title = this.user.title
            this.issueType = this.user.issueType
            this.createDate = this.user.createDate
            this.influentVersion = this.user.influentVersion
            this.actualComplteTime = this.user.actualComplteTime
            this.planModifyTime = this.user.planModifyTime
            this.reStep = this.user.reStep
            this.solution = this.user.solution
            // this.priority = this.user.priority
            this.modifyPersonID = this.user.modifyPersonID
            this.createPersonID = this.user.createPersonID
            this.priorityID = this.showPriority(this.user.priority)
            this.isSolve = true 
            this.isShow = this.isShowDetail
            if(this.$store.state.user.loginID != this.user.createPersonID && this.status == 0){//修改人
              this.isSolve = true //显示解决方案
              this.isShow = true //显示按钮
              this.isShowBtn = true //显示提交验证
            }
            if(this.$store.state.user.loginID != this.user.createPersonID && this.status == -1 ){//修改人
              this.isSolve = true //显示解决方案
              this.isShow = false //不显示按钮
              this.isShowSolve = true //无法修改
            }
            if(this.$store.state.user.loginID != this.user.createPersonID && this.status == 1){//修改人
              this.isSolve = true //显示解决方案
              this.isShowSolve = true //无法修改
              this.isShow = false //不显示按钮
            }
            if(this.$store.state.user.loginID == this.user.createPersonID && this.status == 1){//创建人
              this.isSolve = true //显示解决方案
              this.isShow = true //显示按钮
              this.isShowBtn = false //显示退回修改
              this.isShowSolve = true //无法修改
            }
            if(this.$store.state.user.loginID == this.user.createPersonID && this.status == 0){//创建人
              this.isSolve = false //不显示解决方案
              this.isShowSolve = true //无法修改
            }
            if(this.$store.state.user.loginID == this.user.createPersonID && this.status == -1){//创建人
              this.isSolve = true //显示解决方案
              this.isShow = false //不显示按钮
              this.isShowSolve = true //无法修改
            }
           
        })
        .catch((err) => {
            console.log(err);
        });
        // axios({
        //    method: 'get',
        //    url: imgUrl ,
        //    headers: {
        //      'Content-Type': 'application/x-www-form-urlencoded',
        //      "token": this.token  // 必须添加的请求头
        //    },
        //    responseType: "arraybuffer", // 关键 设置 响应类型为二进制流
        //  }).then(function (response) {  // 将后台的图片二进制流传华为base64
        //    return 'data:image/png;base64,' + btoa(
        //      new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        //    );
        //  }).then(data=>{
        //    this.imgSrc=data; // data即为图片地址
        //   });
          
  },
  mounted(){

  },
  methods: {
    regain() {
      this.$router.push("/");
    },
    verification(){
      const url = this.globalHttpUrl + "issue/update";
        axios({
        method: "put",
        url: url,
        data: this.$qs.stringify({
          solution:this.$refs.solution.value,
          id: this.id,
          status: 1
        }),
      })
        .then((data) => {
          console.log(data.data.status)
          if(data.data.status == 200){
            this.$router.push("/");
          }else(
            alert("提交失败")
          )
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel(){
      const url = this.globalHttpUrl + "issue/update";
        axios({
        method: "put",
        url: url,
        data: this.$qs.stringify({
          id: this.id,
          status: 0 
        }),
      })
        .then((data) => {
          console.log(data.data.status)
          if(data.data.status == 200){
            this.$router.push("/");
          }else(
            alert("提交失败")
          )
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shutDown(){
      const url = this.globalHttpUrl + "issue/update";
        axios({
        method: "put",
        url: url,
        data: this.$qs.stringify({
          id: this.id,
          status: -1,
          issueNo: this.issueNo,
          modifyPersonID: this.modifyPersonID
        }),
      })
        .then((data) => {
          console.log(data.data.status)
          if(data.data.status == 200){
            this.$router.push("/");
          }else(
            alert("提交失败")
          )
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showPriority(str) {
      if (str == 1) {
        str = "最高";
      } else if (str == 2) {
        str = "较高";
      } else if (str == 3) {
        str = "一般";
      } else {
        str = "低";
      }
      return str;
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
.btn1 {
  margin: 20px 100px 0px 100px;
  padding-left: 12px;
  border-radius: 10px;
  border: 1px solid rgb(58, 184, 241);
}
.btn2 {
  padding-left: 12px;
  border-radius: 10px;
  border: 1px solid rgb(58, 184, 241);
  margin: 0;
  margin-left: 5px;
  margin-bottom: 0px;
}
.btn3 {
  margin-top:20px;
  border-radius: 10px;
  border: 1px solid rgb(58, 184, 241);
}
.btn4 {
  text-align: center;
}
.reStepImg{
  width: 30%;
}
</style>