'use strict';

function AppException(message, status, data) {
  this.name = "AppException";
  this.message = (message || "");
  this.status = (status || 500);
  this.data = (data || null);
}

AppException.prototype = new Error();
AppException.prototype.constructor = AppException;

module.exports = AppException;
