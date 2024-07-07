"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// babel.config.mjs
var _default = exports.default = {
  presets: [["@babel/preset-env", {
    "targets": {
      "node": "current"
    }
  }], "@babel/preset-react"],
  plugins: ["@babel/plugin-transform-class-properties", "@babel/plugin-transform-private-methods", "@babel/plugin-transform-private-property-in-object"]
};