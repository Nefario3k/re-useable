export default {
  // make request based on data from the state
  async stateRequest({ commit, state }, data) {
    if (!data.name) return;
    if (state.loaders[data.name]) return;
    commit("setLoaders", data.name);

    const path = state.fetchResources[data.name];
    try {
      await this.$axios.get(path).then((res) => {
        console.log({ [data.name]: res.data.data ? res.data.data : res.data });
        commit("setStoreData", {
          name: data.name,
          data: res.data.data ? res.data.data : res.data,
        });
      });
    } catch (err) {
      if (err?.response?.data?.message) {
        commit("setError", err.response.data.message);
      } else if (err?.response?.message) {
        commit("setError", err.response.message);
      } else if (err?.message) {
        commit("setError", err.message);
      } else {
        commit("setError", "It seems an error occured from the server");
      }
    } finally {
      commit("setLoaders", data.name);
    }
  },
};
