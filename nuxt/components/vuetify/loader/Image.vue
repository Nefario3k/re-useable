<template>
  <v-skeleton-loader
    :max-height="maxHeight ? maxHeight : 120"
    :min-width="minWidth ? minWidth : 150"
    :height="height"
    class="m-0"
    type="image"
  ></v-skeleton-loader>
</template>
<script>
export default {
  props: ["maxHeight", "minWidth", "height"],
};
</script>
