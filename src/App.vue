<template>
  <router-view />
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