const path = require("path");

module.exports = {
  entry: [
    "./js/utils.js",
    "./js/backend.js",
    "./js/pictures.js",
    "./js/move.js",
    "./js/card.js",
    "./js/form.js",
    "./js/pin.js",
    "./js/main.js",
    "./js/debounce.js",
    "./js/filter.js",
  ],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },

  devtool: false

};
