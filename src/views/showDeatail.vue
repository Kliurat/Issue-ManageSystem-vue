<template>
  <div class="create">
    <h1 class="home">GBA Issue管理系统</h1>
    <div class="homeBody">
      <form action="" method="post" class="form">
      <div>
        <img
          src="/pic/return.jpeg"
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
              id="priority"
              v-model="priorityID"
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
      <!-- <div>
          <viewer :images="imgSrc">
              <img v-for="src in imgSrc" :src="src" :key="src" class="reStepImg">
          </viewer>
      </div> -->
      <el-row >
          <el-image v-for="(item,index) in imgSrc" :key="index"  :src="imgSrc[index]" :preview-src-list="imgSrc" @click="aaa(index)" class="reStepImg">
          </el-image>
      </el-row>
      <!-- <div>
        <span v-for="(item, index) in imgSrc" :key="index">
          <img :src="item" alt="" class="reStepImg" />
        </span>
      </div> -->
      <div v-if="isReasonNull">
        <h5><span class="redColor">*</span>退回原因<span class="redColor">*</span></h5>
        <textarea
        class="form-control redColor"
        rows="3"
        v-model="reason"
        disabled
      ></textarea>
       
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
        <div class="hello" v-if="(status!=-1&&isShowNum!=1)">
          <div class="upload">
            <div class="upload_warp">
            <div class="upload_warp_left" @click="fileClick">
              <img src="/pic/upload.png">
            </div>
            <div class="upload_warp_right" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
              或者将文件拖到此处
            </div>
            </div>
            <div class="upload_warp_text">
            选中{{imgList.length}}个文件，共{{bytesToSize(this.size)}}
            <span class="ml20 c-red">[单个附件的最大尺寸为10MB]</span>
            </div>
            <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none" ref="picList">
            <div class="upload_warp_img" v-show="imgList.length!=0">
            <div class="upload_warp_img_div" v-for="(item,index) in imgList" :key="index">
              <div class="upload_warp_img_div_top">
              <div class="upload_warp_img_div_text">
                {{item.file.name}}
              </div>
              <img src="/pic/del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
              </div>
              <img :src="item.file.src">
            </div>
            </div>
          </div>
        </div>
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
              class="btn btn-default btn1 btn5"
              type="button"
              ref="cancel"
              @click="dialogVisible = true"
            >
              退回修改
            </button>
            <el-dialog
              title="退回原因"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="reason">
              </el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="cancel()">确 定</el-button>
              </span>
            </el-dialog>
            <button
              class="btn btn-default btn1 btn6"
              id="reset"
              type="reset"
              ref="shutDown"
              @click="shutDown()"
            >
              关闭Issue
            </button>
          </div>
        </div>
      </div>
    </form>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import { MessageBox } from 'element-ui';
export default {
  name: "showDeatail", //创建新Issue
  props: {},
  data() {
    return {
      imgList: [],
			size: 0,
      isReasonNull:false,
      reason:"",
      handleClose:false,
      dialogVisible:false,
      reason:"",
      imgSrc: [],
      imgUrl:[],
      user: [],
      visit: false,
      globalHttpUrl: this.COMMON.httpUrl,
      data: this.$route.params.data,
      status: this.$route.params.status,
      create: this.$route.params.create,
      modify: this.$route.params.modify,
      isShowDetail: this.$route.params.isShowDetail,
      isShowNum: this.$route.params.num,
      isShow: true,
      isShowBtn: true,
      isSolve: true,
      isShowSolve: false,
      title: "", //题目
      createPersonID: "",
      issueNo: "", //
      createDate: "",
      issueType: "",
      influentVersion: "",
      planModifyTime: "",
      actualComplteTime: "",
      modifyPersonID: "",
      reStep: "",
      solution: "",
      priority: "",
      modifyPersonID: "",
      priorityID: "",
      id: 0,
    };
  },
  created() {
    const url2 = this.globalHttpUrl + "picture/getList";
    const imgUrl = this.globalHttpUrl + "file/download";
    const url = this.globalHttpUrl + "issue/getIssueByIssueNo";
    axios({
      method: "post",
      url: url,
      data: this.$qs.stringify({ issueNo: this.data, status: 1 }),
    })
      .then((data) => {
        this.user = data.data;
        this.id = this.user.id;
        this.issueNo = this.user.issueNo;
        this.title = this.user.title;
        this.issueType = this.user.issueType;
        this.createDate = this.user.createDate;
        this.influentVersion = this.user.influentVersion;
        this.actualComplteTime = this.user.actualComplteTime;
        this.planModifyTime = this.user.planModifyTime;
        this.reStep = this.user.reStep;
        this.solution = this.user.solution;
        // this.priority = this.user.priority
        this.modifyPersonID = this.user.modifyPersonID;
        this.createPersonID = this.user.createPersonID;
        this.priorityID = this.showPriority(this.user.priority);
        this.isSolve = true;
        this.isShow = this.isShowDetail;
        this.reason = this.user.reason;
        if(this.reason!=null){
          this.isReasonNull=true;
        }
        if (
          this.$store.state.user.loginID != this.user.createPersonID &&
          this.status == 0
        ) {
          //修改人
          this.isSolve = true; //显示解决方案
          this.isShow = true; //显示按钮
          this.isShowBtn = true; //显示提交验证
        }
        if (
          this.$store.state.user.loginID != this.user.createPersonID &&
          this.status == -1
        ) {
          //修改人
          this.isSolve = true; //显示解决方案
          this.isShow = false; //不显示按钮
          this.isShowSolve = true; //无法修改
        }
        if (
          this.$store.state.user.loginID != this.user.createPersonID &&
          this.status == 1
        ) {
          //修改人
          this.isSolve = true; //显示解决方案
          this.isShowSolve = true; //无法修改
          this.isShow = false; //不显示按钮
        }
        if (
          this.$store.state.user.loginID == this.user.createPersonID &&
          this.status == 1
        ) {
          //创建人
          this.isSolve = true; //显示解决方案
          this.isShow = true; //显示按钮
          this.isShowBtn = false; //显示退回修改
          this.isShowSolve = true; //无法修改
        }
        if (
          this.$store.state.user.loginID == this.user.createPersonID &&
          this.status == 0
        ) {
          //创建人
          this.isSolve = false; //不显示解决方案
          this.isShowSolve = true; //无法修改
        }
        if (
          this.$store.state.user.loginID == this.user.createPersonID &&
          this.status == -1
        ) {
          //创建人
          this.isSolve = true; //显示解决方案
          this.isShow = false; //不显示按钮
          this.isShowSolve = true; //无法修改
        }
        if(this.isShowNum == 1){
          this.isShow = false
          this.isShowSolve = true
        }

        this.imgUrl=this.user.issuePictures
        for(let i=0;i<this.imgUrl.length;i++){
              this.imgSrc[i]=this.globalHttpUrl + "file/download"+"?url="+this.imgUrl[i].imgUrl;
              console.log(this.imgSrc[i]);
            }
      })
      .catch((err) => {
        console.log(err);
      });
      window.setInterval(this.timer,1000);
    
  },
  methods: {
    fileClick(){
		document.getElementById('upload_file').click()
		},
		fileChange(el){
		if (!el.target.files[0].size) return;
		this.fileList(el.target.files);
		el.target.value = ''
		},
		fileList(files){
		for (let i = 0; i < files.length; i++) {
			this.fileAdd(files[i]);
		}
		},
		fileAdd(file){
		this.size = this.size + file.size;//总大小
		let reader = new FileReader();
		reader.vue = this;
		reader.readAsDataURL(file);
		reader.onload = function () {
			file.src = this.result;
			this.vue.imgList.push({
			file
      });
      this.imgList=this.vue.imgList;
		}
		},
		fileDel(index){
		this.size = this.size - this.imgList[index].file.size;//总大小
		this.imgList.splice(index, 1);
		},
		bytesToSize(bytes){
		if (bytes === 0) return '0 B';
		let k = 1000, // or 1024
			sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			i = Math.floor(Math.log(bytes) / Math.log(k));
		return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
		},
		dragenter(el){
		el.stopPropagation();
		el.preventDefault();
		},
		dragover(el){
		el.stopPropagation();
		el.preventDefault();
		},
		drop(el){
		el.stopPropagation();
		el.preventDefault();
		this.fileList(el.dataTransfer.files);
		},
    aaa(index) {
        var a1=[];
        var a2=[];
        if(index>0){
            a1=this.imgSrc.slice(index);
            a2=this.imgSrc.slice(0,index);
            this.imgSrc= a1.concat(a2)
        }
    },
    regain() {
      this.$router.push("/");
    },
    verification() {
      let files=new FormData();
        for(let i=0;i<this.imgList.length;i++){
          files.append("files",this.imgList[i].file);
        }
        files.append("issueNo",this.issueNo);
      const url = this.globalHttpUrl + "issue/update";
      const url2 = this.globalHttpUrl + "file/upload";
      axios({
        method: "put",
        url: url,
        data: this.$qs.stringify({
          solution: this.$refs.solution.value,
          id: this.id,
          status: 1,
        }),
      })
        .then((data) => {
          console.log(data.data.status);
          if (data.data.status == 200) {
                axios({
                  method: "post",
                  url: url2,
                  data:files,
                })
                  .then((data) => {
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            this.$router.push("/");
          } else {
                const h = this.$createElement;
                this.$message({
                  message: h('p', null, [
                    h('i', { style: 'color: red' }, '提交失败')
                  ])
                });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      const url = this.globalHttpUrl + "issue/update";
      axios({
        method: "put",
        url: url,
        data: this.$qs.stringify({
          issueNo:this.issueNo,
          reason:this.reason,
          id: this.id,
          status: 0,
        }),
      })
        .then((data) => {
          console.log(data.data.status);
          if (data.data.status == 200) {
            this.$router.push("/");
          } else{
                const h = this.$createElement;
                this.$message({
                  message: h('p', null, [
                    h('i', { style: 'color: red' }, '提交失败')
                  ])
                });
          } 
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shutDown() {
      MessageBox.confirm('将关闭该issue','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        const url = this.globalHttpUrl + "issue/update";
          axios({
            method: "put",
            url: url,
            data: this.$qs.stringify({
              id: this.id,
              status: -1,
              issueNo: this.issueNo,
              modifyPersonID: this.modifyPersonID,
            }),
          })
            .then((data) => {
              console.log(data.data.status);
              if (data.data.status == 200) {
                this.$router.push("/");
              } else{
                    const h = this.$createElement;
                    this.$message({
                      message: h('p', null, [
                        h('i', { style: 'color: red' }, '提交失败')
                      ])
                    });
              }
            })
            .catch((err) => {
              console.log(err);
            });
      }) 
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
    handleClick(){
      let self = this
      this.$vueConfirm.confirm(
        {
          message: `Are you sure?`,
          button: {
            no: 'No',
            yes: 'Yes'
          }
        },
        function(confirm) {
          if (confirm == true) {
            self.$vueConfirm.close()
          }
        }
      )
    }
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
  font-size: 35px;
  color: rgb(211, 35, 182);
}
.tle {
  padding-top: 0px;
  display: inline;
  outline: 0;
  font-size: 28px;
  width: 60%;
}

h5 {
  padding-top: 50px;
  font-weight: bold;
}
.return {
  float: left;
  border-radius: 50%;
  width: 65px;
  height: 65px;
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
  
}
.btn2 {
  padding-left: 12px;
  border-radius: 10px;
  margin: 0;
  margin-left: 5px;
  margin-bottom: 0px;
  background-color: #5BC0DE;
  color: white;
}
.btn3 {
  margin-top: 20px;
  border-radius: 10px;
  background-color: #5BC0DE;
  color: white;
}
.btn4 {
  text-align: center;
}
.reStepImg {
  width: 25%;
  height: 180px;
}
.btn5{
  background-color: #F0AD4E;
  width: 18%;
  color: white;
}
.btn6{
  background-color: #D9534F;
  width: 18%;
  color: white;
}
.homeBody{
  margin-top: 70px;
}
h1 {
  height: 70px;
  width: 100%;
  position: fixed;
  text-align: center;
  background-image: url(/pic/13.jpg);
  top: 0;
}
.redColor{
  color: red;
}
#priority{
  width: 100px;
}
.upload_warp_img_div_del {
		  position: absolute;
		  top: 6px;
		  width: 16px;
		  right: 4px;
		}

.upload_warp_img_div_top {
	position: absolute;
	top: 0;
	width: 100%;
	height: 30px;
	background-color: rgba(0, 0, 0, 0.4);
	line-height: 30px;
	text-align: left;
	color: #fff;
	font-size: 12px;
	text-indent: 4px;
}

.upload_warp_img_div_text {
	white-space: nowrap;
	width: 80%;
	overflow: hidden;
	text-overflow: ellipsis;
}

.upload_warp_img_div img {
	max-width: 100%;
	max-height: 100%;
	vertical-align: middle;
}

.upload_warp_img_div {
	position: relative;
	height: 100px;
	width: 120px;
	border: 1px solid #2196F3;
	margin: 0px 30px 10px 0px;
	float: left;
	line-height: 100px;
	display: table-cell;
	text-align: center;
	background-color: #eee;
	cursor: pointer;
}

.upload_warp_img {
	border-top: 1px solid #D2D2D2;
	padding: 14px 0 0 14px;
	overflow: hidden
}

.upload_warp_text {
	text-align: left;
	margin-bottom: 10px;
	padding-top: 10px;
	text-indent: 14px;
	border-top: 1px solid #2196F3;
	font-size: 14px;
}

.upload_warp_right {
	float: left;
	width: 56%;
	margin-left: 2%;
	height: 100%;
	border: 2px dashed #2196F3;
	border-radius: 4px;
	line-height: 130px;
	color: #2196F3;
}

.upload_warp_left img {
	margin-top: 32px;
}

.upload_warp_left {
	float: left;
	width: 40%;
	height: 100%;
	border: 2px dashed #2196F3;
	border-radius: 4px;
	cursor: pointer;
}

.upload_warp {
	margin: 14px;
	height: 130px;
}

.upload {
	border: 1px solid #2196F3;
	background-color: #fff;
	width: 100%;
	border-radius: 4px;
}

.hello {
	text-align: center;
}
.ml20{
	margin-left: 20px;
}
.c-red{
	color: red;
}
</style>
