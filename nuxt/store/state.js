const getDefaultState = () => {
  return {
    // arrays
    arr: [],

    // objects
    obj: {},
    // boolean
    bool: true,

    // routes
    fetchResources: {
      arr: "arr",
    },

    loaders: {
      arr: false,
    },

    // handle error
    errObj: {
      absolute: false,
      border: false,
      svg: true,
      header: "An Error Occured",
      subtext: "",
      headerColor: "#fff",
      subtextColor: "#fff",
      svgStroke: "var(--danger_color)",
      svgType: "danger",
      svgColor: "#fff",
      color: "var(--danger_color)",
      right: 14,
      bottom: 77,
    },
  };
};
export default () => {
  return getDefaultState();
};
