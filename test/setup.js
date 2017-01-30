require("babel-core/register")
require("babel-polyfill")

global.window = {
  sessionStorage: {
    getItem: () => {},
    setItem: () => {}
  },
  localStorage: {
    getItem: () => {},
    setItem: () => {}
  }
};
