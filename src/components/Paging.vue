<template>
  <div class="pageList">
    <button type="button" class="btn btn-default" @click="prev()">
      <b-icon icon="caret-left-fill"></b-icon>
    </button>
    <button
      class="btn btn-default btn2"
      v-for="(page, num) in page"
      :key="num"
      @click="to(num + 1)"
    >
      {{ num + 1 }}
    </button>
    <button type="button" class="btn btn-default" @click="next()">
      <b-icon icon="caret-right-fill"></b-icon>
    </button>
    <button class="btn btn-default">{{ amount }}条/页</button>
    <span>跳至</span>
    <input type="text" @change="goto($event)" class="goto" ref="pageTo" />
    <span>页</span>
  </div>
</template>

<script>
export default {
  name: "paging",
  props: ["adress"],
  data() {
    return {
      total: 0,
      amount: 20,
      currentPage: 1,
      currentPageUsers: [],
      page: [],
      globalHttpUrl: this.COMMON.httpUrl,
    };
  },
  methods: {
    getPageUsers() {
      this.currentPageUsers = [];
      if (this.page.length != 0) {
        if (this.currentPage != this.page.length)
          for (let i = 0; i < this.amount; i++) {
            let j = (this.currentPage - 1) * this.amount;
            this.currentPageUsers[i] = this.users[i + j];
          }
        else
          for (
            let i = 0;
            i < this.total - this.amount * (this.page.length - 1);
            i++
          ) {
            let j = (this.currentPage - 1) * this.amount;
            this.currentPageUsers[i] = this.users[i + j];
          }
      }
    },
    pageList() {
      this.page = [];
      let j = this.total / this.amount;
      for (let i = 0; i < j; i++) this.page[i] = i;
    },
    to(num) {
      this.currentPage = num;
      console.log(this.currentPage);
      this.getPageUsers();
    },
    goto(event) {
      this.currentPage = event.target.value;
      this.getPageUsers();
      this.$refs.pageTo.value = "";
    },
    prev() {
      if (this.currentPage != 1) this.currentPage--;
      this.getPageUsers();
    },
    next() {
      if (this.currentPage != this.page.length) this.currentPage++;
      this.getPageUsers();
    },
  },
  created() {
    const url = this.globalHttpUrl + this.adress;
    axios({
      method: "get",
      url: url,
    })
      .then((data) => {
        this.users = data.data;
        this.total = this.users.length;
        this.pageList();
        this.getPageUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.btn2 {
  padding-left: 12px;

  border-radius: 10px;
  border: 1px solid rgb(58, 184, 241);
  margin: 0;
  margin-left: 5px;
  margin-bottom: 0px;
}
</style>

