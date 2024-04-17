<template>
  <div>
    <v-dialog
      overlay-opacity="1"
      overlay-color="var(--scrim)"
      :persistent="loading"
      :max-width="470"
      v-model="showModal"
      :width="width"
    >
      <v-card color="var(--text_light)" class="modal_box">
        <!-- close section -->
        <ModalClose @closeModal="closeModal" />
        <div class="modal_container text-center"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import showStatus from "~/mixins/showStatus";
export default {
  mixins: [showStatus],
  data() {
    return {
      showModal: false,
      width: "100%",
      items: {},
    };
  },
  methods: {
    closeModal() {
      if (this.loading) return;
      this.showModal = false;
      this.items = {};
    },
    openModal(val = null) {
      this.showModal = true;
      if (val) {
        this.items = val;
      }
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
h3 {
  color: var(--text_dark);
  font-size: var(--font_h2);
  font-weight: 500;
  margin-block: 16px 8px !important;
}

p {
  color: var(--text_dark);
  font-size: var(--font_md);
  font-weight: 400;
  margin-inline: auto;
  width: 100%;
  max-width: 31.4rem;
  &.subText {
    margin-block: 8px 55px !important;
    font-size: var(--font_sm);
    color: var(--text_dark2);
  }
}
</style>
