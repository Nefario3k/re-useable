<template>
  <div
    :class="`${showStyles().show ? 'px-3' : ''} d-flex flex-column justify-end`"
    :style="{ zIndex: statusArr.length ? '9999' : '0' }"
    style="
      position: fixed;
      padding-block: 24px;
      bottom: 0;
      right: 0;
      width: max-content;
      max-width: 100%;
      overflow: hidden;
    "
  >
    <TransitionGroup name="slide">
      <div
        class="d-flex justify-end"
        v-if="item.show"
        v-for="(item, id) in statusArr"
        :key="id + 77822"
      >
        <div
          @mouseover="onMouseOver(id)"
          @mouseleave="onMouseLeave(id)"
          :style="`background-color: ${item.color};z-index: ${item.index}; border-bottom-color: ${item.borderColor};`"
          :class="{ relative: true, borderstyled: item.border, fixed: false }"
          class="statusWrapper"
        >
          <!-- icon  -->
          <div class="iconCenter" v-if="item.svg">
            <template v-if="item.svgType == 'danger'">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 19.9074C0 8.91285 8.91285 0 19.9074 0C30.902 0 39.8148 8.91285 39.8148 19.9074C39.8148 30.902 30.902 39.8148 19.9074 39.8148C8.91285 39.8148 0 30.902 0 19.9074Z"
                  :fill="item.svgColor"
                />
                <path
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.364 17.95L25.314 13L26.728 14.414L21.778 19.364L26.728 24.314L25.314 25.728L20.364 20.778L15.414 25.728L14 24.314L18.95 19.364L14 14.414L15.414 13L20.364 17.95Z"
                  :fill="item.svgStroke"
                />
              </svg>
            </template>
            <template v-else-if="item.svgType == 'info'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 17V11"
                  :stroke="item.svgColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <circle
                  cx="1"
                  cy="1"
                  r="1"
                  transform="matrix(1 0 0 -1 11 9)"
                  :fill="item.svgColor"
                />
                <path
                  d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                  :stroke="item.svgColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </template>
            <template v-else>
              <SvgStatusCheck :svgColor="item.svgColor" :svgStroke="item.svgStroke" />
            </template>
          </div>
          <!-- text  -->
          <div class="status__text">
            <p
              v-if="item.header"
              v-html="item.header"
              :style="`color: ${item.headerColor}`"
            ></p>
            <span
              v-if="item.subtext"
              v-html="item.subtext"
              :style="`color: ${item.subtextColor}`"
            ></span>
          </div>
          <!-- close button  -->
          <button
            @click="closeToast(id)"
            title="Close Toast"
            :class="`closeBtn ${item.svgType}`"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                fill="var(--border9)"
              />
            </svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus.js";
export default {
  props: [],
  data() {
    return {
      statusArr: [],
    };
  },
  methods: {
    startTimeout(duration, id) {
      this.statusArr[id].timeoutId = setTimeout(() => {
        this.closeToast(id);
      }, duration);
    },
    onMouseOver(id) {
      clearTimeout(this.statusArr[id].timeoutId);
      this.statusArr[id].timeoutId = null;
    },
    onMouseLeave(id) {
      this.startTimeout(500, id);
    },
    closeToast(id) {
      if (this.statusArr[id]) {
        if (this.statusArr[id]?.show) this.statusArr[id].show = false;
        this.statusArr[id].timeoutId = null;
      }
    },
    showStyles() {
      var show = false;
      if (this.statusArr) {
        const arr = this.statusArr.filter((element) => {
          return element.show;
        });
        if (arr.length) show = true;
      }
      return { show: show };
    },
  },
  mounted() {
    EventBus.$on("show-toast", ({ duration, content }) => {
      var item = {
        show: true,
        timeoutId: null,
        absolute: false,
        svg: true,
        border: false,
        fixed: true,
        right: 20,
        bottom: 77,
        index: 99999999999,
        color: "",
        header: "",
        headerColor: "var(--text-light)",
        subtext: "",
        borderColor: "",
        subtextColor: "var(--text-light)",
        svgStroke: "",
        svgColor: "#fff",
        svgType: "check",
      };
      Object.entries(content).forEach(([key, value]) => {
        item[key] = value;
      });
      this.statusArr.push(item);
      this.startTimeout(duration, this.statusArr.length - 1);
      if (item.subtext === "Unauthenticated.") {
        this.$auth.logout();
      }
    });
    setInterval(() => {
      this.statusArr = [];
    }, 60000);
  },
};
</script>

<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
