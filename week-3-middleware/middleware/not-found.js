const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({
      message: `You can't do a ${req.method} for ${req.url}`,
      error: "Route not found",
      requestId: req.requestId,
    });
};

module.exports = notFoundMiddleware;
