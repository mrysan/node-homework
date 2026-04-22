const express = require("express");
// const { v4: uuidv4 } = require("uuid"); // did not use as gave error due to ESM/EJS incompatibility with Node,  assignment3b test wouldnt run with it.

const dogsRouter = require("./routes/dogs");
const notFoundMiddleware = require("./middleware/not-found");
const requestValidationMiddleware = require("./middleware/request-validation.js");
const requestIdMiddleware = require("./middleware/request-id");
const loggingMiddleware = require("./middleware/logging");
const securityHeadersMiddleware = require("./middleware/security-headers.js");

const app = express();

// Your middleware here
app.use(requestIdMiddleware);
app.use(loggingMiddleware);
app.use(securityHeadersMiddleware);
app.use(express.json({ limit: "1mb" }));
app.use(requestValidationMiddleware);

//routes
app.use("/", dogsRouter); // Do not remove this line
app.use("/images", express.static("public/images"));

// error handling middleware
app.use(notFoundMiddleware);

// default error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    console.warn("WARN: ValidationError " + err.message);
    return res
      .status(err.statusCode)
      .json({ error: err.message, requestId: req.requestId });
  }

  if (err.name === "NotFoundError") {
    console.warn("WARN: NotFoundError " + err.message);
    return res
      .status(err.statusCode)
      .json({ error: err.message, requestId: req.requestId });
  }
  if (err.name === "UnauthorizedError") {
    console.warn("WARN: UnauthorizedError " + err.message);
    return res
      .status(err.statusCode)
      .json({ error: err.message, requestId: req.requestId });
  }

  console.error("ERROR: Error " + err.message);

  return res.status(500).json({
    error: "Internal Server Error",
    requestId: req.requestId,
  });
});

const server = app.listen(3000, () =>
  console.log("Server listening on port 3000"),
);
module.exports = server;
