<template>

  <router-view id="main"/>
</template>

<script>
export default {
  mounted() {
    window.addEventListener("unload", this.saveState);
  },
  methods: {
    saveState() {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    },
  },
};
</script>

<style>
  body {
    background-image: url(/pic/13.jpg);
    background-size: cover;

  }
</style>