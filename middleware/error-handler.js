const { statusCodes } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case statusCodes.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case statusCodes.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case statusCodes.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case statusCodes.UNAUTHORIZED:
      res.json({
        title: "UN AUTHORIZED",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case statusCodes.INTERNALSERVERERROR:
      res.json({
        title: "server error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("no errors, all good");
      break;
  }
};

module.exports = errorHandler;
