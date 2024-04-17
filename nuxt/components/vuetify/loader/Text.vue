<template>
  <v-skeleton-loader
    :max-width="maxWidth ? maxWidth : '100%'"
    type="text"
    width="100%"
  ></v-skeleton-loader>
</template>
<script>
export default {
  props: ["maxWidth"],
};
</script>
