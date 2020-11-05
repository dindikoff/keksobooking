const path = require('path');

module.exports = {
  entry: [
    './js/utils.js',
    './js/backend.js',
    './js/move.js',
    './js/card.js',
    './js/form.js',
    './js/pin.js',
    './js/debounce.js',
    './js/filter.js',
    './js/main.js',

    './js/pictures.js',
  ],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },

  devtool: false

};
