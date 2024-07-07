"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
const storage = _multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = (0, _multer.default)({
  storage: storage
});
var _default = exports.default = upload;