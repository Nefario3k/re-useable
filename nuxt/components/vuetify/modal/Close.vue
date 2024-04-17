<template>
  <Button
    title="Close"
    @click="$emit('closeModal')"
    :elevation="1"
    class="close_mark"
    :svg="true"
    svgLeft="SvgXmark"
    width="4rem"
    minWidth="4rem"
    height="4rem"
    color="transparent"
  />
</template>

<script>
export default {};
</script>
