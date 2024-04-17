// for vue or nuxt
/* eslint-disable vue/one-component-per-file */
import Vue from "vue";
// currency input
import VueCurrencyInput from "vue-currency-input";
// date picker
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
// show toast
import { showToast } from "@/global-functions.js";
Vue.prototype.$showToast = showToast;

// for event bus
const eventBus = {};
eventBus.install = function (Vue) {
  Vue.prototype.$bus = new Vue();
};

// date picker
Vue.component("DatePicker", {
  extends: DatePicker,
});

// event bus
Vue.use(eventBus);

// currency input
Vue.use(VueCurrencyInput);
