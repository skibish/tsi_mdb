function AppException(message, status) {
  this.name = "AppException";
  this.message = (message || "");
  this.status = status;
}

AppException.prototype = new Error();
AppException.prototype.constructor = AppException;

module.exports = AppException;
