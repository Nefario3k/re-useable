<template>
  <div v-if="loading" class="loading-page">
    <div class="loader">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="
          margin: auto;
          background: none;
          display: block;
          shape-rendering: auto;
        "
        width="175"
        height="175"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="var(--primary_color)"
          stroke-width="4"
          r="22"
          stroke-dasharray="103.67255756846316 36.55751918948772"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { loading: false };
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  /* background-image: radial-gradient(
    circle farthest-corner at center,
    #3c4b57 0%,
    #1c262b 100%
  ); */
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 9999999999;
}
.loader {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  perspective: 800px;
}
</style>
