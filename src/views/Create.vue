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
              placeholder="系统自动生成"
              disabled
            />
          </td>
          <td>
            <input
              type="date"
              class="form-control"
              v-model="createDate"
              ref="createDate"
              disabled
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
              type="datetime-local"
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
              placeholder="系统自动生成"
              disabled
            />
          </td>
          <td></td>
        </tr>
      </table>
      <h5>重现步骤</h5>
      <textarea
        class="form-control reStep"
        rows="3"
        ref="reStep"
        maxlength="2000"
      ></textarea>
      <div class="upload">
            <div id="app">
	  <div class="hello">
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
	</div>
      </div>
   
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
      <datalist id="userlist">
        <option
          v-for="(user, index) in user"
          :key="index"
          :value="user.loginID"
          v-text="'姓名:' + user.username"
        ></option>
      </datalist>
      <span v-show="visit">该修改人不存在或输入错误,请输入修改人ID</span>

      <br />
      <button type="button" class="btn btn-default btn-lg" @click="submit()">
        提交
      </button>
    </form>
    </div>
    
  </div>
</template>

<script src="js/vue.min.js"></script>
<script>

import axios from "axios";
export default {
  name: "Create", //创建新Issue
  data() {
    return {
      imgList: [],
			size: 0,
      createDate: new Date(),
      user: [],
      visit: false,
      globalHttpUrl: this.COMMON.httpUrl,
    };
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
    regain() {
      this.$router.push("/");
    },
    checkTime(event) {
      if (this.createDate > event.target.value) {
        alert("计划修改时间不得早于当前时间！！！");
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
        let files=new FormData();
        for(let i=0;i<this.imgList.length;i++){
          files.append("files",this.imgList[i].file);
        }
        const url = this.globalHttpUrl + "issue";
        const url2 = this.globalHttpUrl + "file/upload";
        axios({
          method: "post",
          url: url,
          data: this.$qs.stringify({
            createPersonID:this.$store.state.user.loginID,
            title: this.$refs.title.value,
            issueType: this.$refs.issueType.value,
            priority: this.$refs.priority.value,
            influentVersion: this.$refs.influentVersion.value,
            timeStr: this.$refs.planModifyTime.value,
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
        axios({
          method: "post",
          url: url2,
          // headers:{
          //   "Content-Type":"multipart/form-data"
          // },
          data:files,
        })
          .then((data) => {
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
  created() {
    const url = this.globalHttpUrl + "selectAll/user";
    axios({
      method: "post",
      url: url,
      data:this.$qs.stringify({
        loginID:this.$store.state.user.loginID,
      }),
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
#sel {
  width: 82px;
}
.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: fixed;
}
input {
  background-color: transparent;
}
textarea {
  background-color: transparent;
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
.reStep{
  height: 180px;
}
</style>