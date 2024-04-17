<template>
  <v-tooltip
    :content-class="`listTool ${contentClass}`"
    :nudge-top="2"
    :nudge-left="1"
    top
    color="var(--bg-dark6)"
  >
    <template v-slot:activator="{ on, attrs }">
      <div style="display: grid; place-items: center" v-bind="attrs" v-on="on">
        <Button
          v-if="icon"
          @click="$emit('click')"
          :elevation="0"
          style="padding: 0"
          class="p-0 m-0 tooltipBtn"
          textColor="var(--label-light3)"
          width="max-content"
          :svg="true"
          :svgLeft="icon"
          minWidth="max-content"
          height="max-content"
          color="transparent"
          :ripple="false"
        />
        <slot v-else></slot>
      </div>
    </template>
    <span class="tooltip__span">{{ text }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    contentClass: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "tool tip",
    },
  },
};
</script>

<style lang="scss" scoped>
</style>