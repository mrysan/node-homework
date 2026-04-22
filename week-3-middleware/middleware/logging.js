const loggingMiddleware = (req, res, next) => {
  const printReq = `[${new Date().toISOString()}]: ${req.method} ${req.path} (${req.requestId})`;
  console.log(printReq);
  next();
};

module.exports = loggingMiddleware;
