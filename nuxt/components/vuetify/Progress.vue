<template>
  <v-progress-circular
    v-if="type === 'circular'"
    indeterminate
    :size="size"
    :color="color"
  ></v-progress-circular>
</template>

<script>
export default {
  props: {
    size: {
      type: String | Number,
      default: "20",
    },
    type: {
      type: String,
      default: "circular",
    },
    color: {
      type: String,
      default: "var(--text-dark)",
    },
  },
};
</script>

<style lang="scss" scoped></style>
