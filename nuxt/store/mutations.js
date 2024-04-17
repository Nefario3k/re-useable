import { showToast } from "@/global-functions.js";
export default {
  // basic state mutation
  setStoreData(state, details) {
    state[details.name] = details.data;
  },
  // advanced state mutation
  setState(state, data) {
    for (const key in data) {
      const keyArr = key.split("/");
      if (keyArr.length == 3) {
        state[`${keyArr[0]}`][`${keyArr[1]}`][`${keyArr[2]}`] = data[key];
      } else if (keyArr.length == 2) {
        state[`${keyArr[0]}`][`${keyArr[1]}`] = data[key];
      } else {
        state[key] = data[key];
      }
    }
  },
  // set state loaders
  setLoaders(state, key) {
    if (state.loaders.hasOwnProperty(key)) {
      state.loaders[key] = !state.loaders[key];
    }
  },
  // sort state array
  sortArray(state, { details, keyword }) {
    state[details[keyword]] = [];
    state[details[keyword]] = details.val.sort((a, b) => {
      if (a[keyword] < b[keyword]) {
        return -1;
      }
      if (a[keyword] > b[keyword]) {
        return 1;
      }
      return 0;
    });
  },
  // set errors from request
  setError(state, subtext) {
    state.errObj.subtext = subtext;
    showToast(state.errObj);
  },
  // reset the state data to the initial on load
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};
