// did not use uuidv4 as gave error due to ESM/EJS incompatibility with Node,  assignment3b test wouldnt run with it enabled...
//const { v4: uuidv4 } = require("uuid");
// this serves the same functionality
const { randomUUID } = require("crypto");

const requestIdMiddleware = (req, res, next) => {
  req.requestId = randomUUID();
  res.setHeader("X-Request-Id", req.requestId);
  next();
};

module.exports = requestIdMiddleware;
