<template>
  <v-navigation-drawer
    style="z-index: 100"
    overlay-color="var(--scrim)"
    :overlay-opacity="1"
    color="var(--text_light)"
    v-model="showDrawer"
    :right="true"
    :width="width"
    temporary
    :permanent="permanent || loading"
    fixed
    class="panel__container"
  >
    <PanelClose title="User Profile" :elevation="elevation" @closeDrawer="closeDrawer" />

    <div class="main_content_area">
      <div
        autocomplete="off"
        class="panel__content h-100 d-flex flex-column justify-space-between relative"
      >
        <!-- main content  -->
        <div ref="main__content" @scroll="handleScroll" class="h-100 pb-0 main__content">
          <!--========================== content  ==========================-->
          <section class="input__area settings__contaniner">
            <div class="general__container"></div>
          </section>
        </div>
        <!-- send button  -->
        <div class="bottom__area d-block">
          <div class="align_auto mt-3">
            <Button
              :outlined="true"
              :elevation="0"
              textColor="var(--primary_color)"
              text="In review"
              height="5rem"
              contentClass="pill"
              color="var(--primary_color)"
            />
            <Button
              :disabled="loading"
              :isSpinner="load === 'resolved'"
              :elevation="0"
              textColor="var(--text_light)"
              text="Resolve"
              height="5rem"
              contentClass="pill"
              color="var(--primary_color)"
            />
          </div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import showStatus from "~/mixins/showStatus";
export default {
  mixins: [showStatus],
  data() {
    return {
      showDrawer: false,
      elevation: 0,
      width: 560,
      permanent: false,
    };
  },
  mounted() {
    var nx = window.innerWidth;
    if (nx <= 599) {
      this.width = "100vw";
    }
    window.addEventListener("resize", function (event) {
      var w = window.innerWidth;
      nx = w;
    });
    $(window).resize(() => {
      if (nx <= 599) {
        this.width = "100vw";
      } else {
        this.width = 560;
      }
    });
    this.$bus.$on("togglePermanent", () => {
      this.permanent = !this.permanent;
    });
  },
  beforeDestroy() {
    this.$bus.$off("togglePermanent");
  },
  methods: {
    closeDrawer() {
      if (this.loading || this.permanent) return;
      this.showDrawer = false;
    },
    showPanel(val = null) {
      if (this.$refs.main__content) this.$refs.main__content.scrollTop = 0;
      this.showDrawer = true;
    },
    handleScroll() {
      const main__content = this.$refs.main__content;
      const heightScrolled = main__content.scrollTop;
      // const initialHeight = main__content.scrollHeight;
      if (heightScrolled > 0) {
        this.elevation = 1;
      } else {
        this.elevation = 0;
      }
    },
  },
  watch: {
    showDrawer() {
      if (!this.showDrawer) {
        setTimeout(() => {
          if (this.$refs.main__content) this.$refs.main__content.scrollTop = 0;
        }, 200);
      }
    },
  },
};
</script>
