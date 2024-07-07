"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeConnection = closeConnection;
exports.getConnection = getConnection;
var _promise = _interopRequireDefault(require("mysql2/promise"));
var _dotenv = require("dotenv");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
(0, _dotenv.config)({
  path: './car.env'
});
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};
const connectionPool = _promise.default.createPool(dbConfig);
async function getConnection() {
  try {
    return connectionPool.getConnection();
  } catch (error) {
    console.error('connection to database failed', error);
    throw error;
  }
}
async function closeConnection(connection) {
  connection.release();
}