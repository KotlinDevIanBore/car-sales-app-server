"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transactionRapper;
var _db = require("./db.mjs");
async function transactionRapper(callback) {
  const connection = await (0, _db.getConnection)();
  try {
    await connection.beginTransaction();
    await callback(connection);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
  } finally {
    connection.release();
  }
}