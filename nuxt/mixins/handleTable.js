import showStatus from "~/mixins/showStatus";
import FileSaver from "file-saver";
export default {
  mixins: [showStatus],
  props: {
    initialSearchObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      pagination: {},
      searchParams: {
        page: 1,
        per_page: 10,
        transaction_id: null,
        search_string: "",
        wallet_type: null,
        transaction_type: null,
        user_id: null,
        status: null,
        start_date: null,
        end_date: null,
        sort_by: "created_at",
        sort_direction: "desc",
      },
      newPerPage: 0,
      initialFetch: 0,
      tableData: [],
      componentName: this.$options.name || null,
    };
  },
  methods: {
    async fetchDefaultTable(val = null) {
      if (!this.componentName) return;
      if (this.tableLoader) return;
      if (!val) {
        this.resetSearchParams();
      }
      try {
        this.tableLoader = true;
        this.isActive();
        const { data: res } = await this.$getRequest({
          path:
            this.$fetchResourceLink(this.componentName) +
            this.$setSearchParams(this.searchParams),
        });
        this.tableData = res.data.data;
        this.pagination = {
          per_page: res.data.per_page,
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          ...this.$setItemPerPage(),
        };

        console.log(this.componentName, res.data);
        this.$emit("setLength", this.tableData.length);
      } catch (err) {
        this.catchError(err);
      } finally {
        this.tableLoader = false;
      }
    },
    async exportTable() {
      try {
        this.$loadingAnimation().start();
        let fileName = this.componentName + ".xlsx";
        // set headers
        const config = {
          responseType: "arraybuffer", //very important
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": 'attachment; filename="' + fileName + '"',
          },
        };
        const { data: res } = await this.$getRequest({
          path:
            this.$fetchResourceLink(this.componentName + "_export") +
            this.$setSearchParams(this.searchParams),
          config,
        });
        const blob = new Blob([res], {
          type: "application/octet-stream",
        });
        FileSaver.saveAs(blob, fileName);
        this.showSuccess(fileName + " downloaded successfully!", "Export");
      } catch (err) {
        this.catchError(err);
      } finally {
        this.$loadingAnimation().finish();
      }
    },
    async setUserStatus(payload) {
      if (!this.$setPermission("edit users")) {
        this.showInfo("You do not have the required permission", "edit users");
        return;
      }
      try {
        this.$loadingAnimation().start();
        const { data: res } = await this.$putRequest({
          path: this.$fetchResourceLink(this.componentName),
          payload,
        });
        this.fetchDefaultTable(1);
        console.log(res);
        this.showSuccess(
          res.message ? res.message : "User status successfully updated!"
        );
      } catch (err) {
        this.catchError(err);
      } finally {
        this.$loadingAnimation().finish();
      }
    },
    reloadTableAfterDelete() {
      if (this.searchParams.page !== 1 && this.tableData.length === 1) {
        this.searchParams.page--;
      }

      this.fetchDefaultTable(1);
    },
    resetSearchParams() {
      this.searchParams = {
        page: 1,
        per_page: this.searchParams.per_page,
        transaction_id: null,
        search_string: "",
        wallet_type: null,
        transaction_type: null,
        user_id: null,
        status: null,
        start_date: null,
        end_date: null,
        sort_by: "created_at",
        sort_direction: "desc",
      };
    },
    loadMore(value) {
      let makeReq = false;
      if (!value) {
        this.searchParams.page = this.pagination.current_page;
        makeReq = true;
      } else if (value.action) {
        if (value.action == "next") {
          this.searchParams.page = value.current_page + 1;
        } else {
          this.searchParams.page = value.current_page - 1;
        }
        makeReq = true;
      } else {
        if (value !== this.searchParams.page) {
          this.searchParams.page = value;
          makeReq = true;
        }
      }
      if (makeReq) {
        this.fetchDefaultTable(1);
      }
    },
    getPerPage(value) {
      this.searchParams.page = 1;
      this.searchParams.per_page = value;
      this.fetchDefaultTable(1);
    },
    isActive() {
      let isActive = false;
      const excludeArr = ["page", "per_page", "sort_by", "sort_direction"];
      Object.entries(this.searchParams).forEach(([key, value]) => {
        if (!excludeArr.includes(key) && value) {
          isActive = true;
        }
      });
      this.$emit("isActive", isActive);
    },
  },
  watch: {
    tableLoader() {
      this.$emit("setLoader", this.tableLoader);
    },
  },
  mounted() {
    // if max num is required
    if (this.newPerPage) {
      this.searchParams.per_page = this.newPerPage;
    }
    // if route has user_id
    if (this.$route.query?.user_id) {
      this.searchParams.user_id = this.$route.query.user_id;
      this.initialFetch = 1;
    }
    // initial search obj
    if (Object.keys(this.initialSearchObj).length) {
      Object.entries(this.initialSearchObj).forEach(([key, value]) => {
        if (key in this.searchParams) {
          this.searchParams[key] = value;
          this.initialFetch = 1;
        }
      });
    }
    // make request
    this.fetchDefaultTable(this.initialFetch);
    this.$bus.$on("fetchTable", (val) => {
      if (!val?.type || (val?.type && val.type === this.componentName)) {
        this.fetchDefaultTable(val);
      }
    });
    // edit table
    this.$bus.$on("searchTableValue", (data) => {
      if (!data?.type || (data?.type && data.type === this.componentName)) {
        if (data.key !== "date" && this.searchParams[data.key] !== data.val) {
          this.searchParams[data.key] = data.val;
          this.searchParams.page = 1;
          if (data.key === "start_date") {
            this.searchParams.end_date = this.$formatDateSimple(new Date());
          }
          this.fetchDefaultTable(1);
        } else if (data.key === "date") {
          this.searchParams.end_date = data.val.end_date;
          this.searchParams.start_date = data.val.start_date;
          this.fetchDefaultTable(1);
        }
      }
    });
    // export
    this.$bus.$on("exportTable", (val = null) => {
      if (!val || (val && val === this.componentName)) {
        this.exportTable();
      }
    });
  },
  beforeDestroy() {
    this.$bus.$off("fetchTable");
    this.$bus.$off("searchTableValue");
    this.$bus.$off("exportTable");
  },
};
