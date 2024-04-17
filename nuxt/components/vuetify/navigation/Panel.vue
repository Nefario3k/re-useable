<template>
  <div>
    <v-navigation-drawer
      overlay-opacity="1"
      overlay-color="var(--scrim)"
      app
      v-model="drawer"
      color="var(--bg_dark)"
      temporary
      style="z-index: 121"
      class="sideBar"
    >
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  methods: {
    showNavBar() {
      this.drawer = true;
    },
  },
};
</script>

<style scoped lang="scss"></style>
