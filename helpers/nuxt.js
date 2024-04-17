export default ({ app, store }, inject) => {
  // toggle full page loader
  inject("loadingAnimation", () => {
    return {
      start() {
        let body = document.querySelector("body");
        $nuxt.$loading.start();
        // body.style.height = "100vh";
        body.style.overflow = "hidden";
      },
      finish() {
        let body = document.querySelector("body");
        $nuxt.$loading.finish();
        // body.style.height = null;
        body.style.overflow = null;
      },
    };
  });
  // logout user
  inject("logOutUser", async () => {
    try {
      // tentative
      app.$loadingAnimation().start();
      app.$commitToLocalStorage("Logged out.", "loginMessage");
      await app.$auth.logout();
      store.commit("resetState");
    } catch (err) {
      var message;
      if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (err?.response?.message) {
        message = err.response.message;
      } else if (err?.message) {
        message = err.message;
      } else {
        message = "It seems an error occured from the server";
      }
      store.commit("setError", message);
    } finally {
      app.$loadingAnimation().finish();
    }
  });
  // fetch user
  inject("fetchUser", async () => {
    await app.$auth.fetchUser();
  });
  // get logged-in user
  inject("getUser", () => {
    return structuredClone(store?.$auth?.$state?.user);
  });
  // return state data
  inject("getStateData", (val) => {
    return app.store.state[val];
  });
};
