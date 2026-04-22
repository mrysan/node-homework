const requestValidation = (req, res, next) => {
  if (req.method === "POST") {
    if (!(req.header("Content-Type") === "application/json")) {
      return res.status(400).json({
        error: "Content-Type must be application/json",
        requestId: req.requestId,
      });
    }
  }

  next();
};

module.exports = requestValidation;
