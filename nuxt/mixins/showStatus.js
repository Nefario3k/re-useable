export default {
  data() {
    return {
      permanent: false,
      reloadData: false,
      tableLoader: false,
      searchContents: false,
      loading: false,
      errors: null,
      errorsObj: {},
    };
  },
  methods: {
    showError(res, head = null) {
      this.$showToast({
        absolute: false,
        border: false,
        svg: true,
        header: head ? head : "An Error Occured",
        subtext: res ? res : "It seems an error occured from the server",
        headerColor: "#fff",
        subtextColor: "#fff",
        svgStroke: "var(--danger_color)",
        svgType: "danger",
        svgColor: "#fff",
        color: "var(--danger_color)",
        right: 14,
        bottom: 77,
      });
      this.permanent = false;
      this.tableLoader = false;
      this.loading = false;
      this.reloadData = false;
      this.searchContents = false;
      this.$loadingAnimation().finish();
    },
    showSuccess(res, head = null) {
      this.$showToast({
        header: head ? head : "Success!",
        subtext: res ? res : "Action carried out successfully",
        headerColor: "var(--text_light)",
        subtextColor: "var(--text_light)",
        svg: true,
        svgStroke: "var(--bg_dark)",
        svgColor: "var(--green)",
        svgType: "check",
        color: "var(--primary_color)",
        right: 14,
        bottom: 77,
      });
      this.$loadingAnimation().finish();
    },
    showInfo(res, head = null) {
      this.$showToast({
        header: head ? head : "Warning!",
        subtext: res ? res : "Somethings missing in your request",
        headerColor: "var(--primary_color)",
        subtextColor: "var(--text_dark2)",
        svg: true,
        svgColor: "var(--primary_color)",
        svgType: "info",
        color: "var(--primary_lte_color)",
        right: 14,
        bottom: 77,
      });
      this.$loadingAnimation().finish();
    },
    showTableLoader() {
      this.tableLoader = !this.tableLoader;
    },
    catchError(err, head = null) {
      var message;
      if (err?.response?.data?.message) {
        message = err.response.data.message;
        if (err.response.data?.errors)
          this.errorsObj = err.response.data.errors;
      } else if (err?.response?.message) {
        message = err.response.message;
      } else {
        message = err.message;
      }

      if (message && message.toLowerCase().includes("network error")) {
        this.showInfo(message, "Connection error!");
      } else {
        this.showError(message, head);
      }
      this.errors = message;
      this.loading = false;
    },
  },
};
