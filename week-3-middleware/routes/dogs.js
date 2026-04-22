const express = require("express");
const router = express.Router();
const dogs = require("../dogData.js");
// In routes/dogs.js
const {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  DefaultError,
} = require("../errors");

router.get("/dogs", (req, res) => {
  console.log(req.requestId);
  res.json(dogs);
});

router.post("/adopt", (req, res) => {
  const { name, address, email, dogName } = req.body;
  // Throw a ValidationError
  if (!name || !email || !dogName) {
    throw new ValidationError("Missing required fields");
  }

  const dog = dogs.find((dog) => {
    return dog.name === dogName;
  });

  // Throw a NotFoundError
  if (!dog || dog.status !== "available") {
    throw new NotFoundError("Dog not found or not available");
  }

  return res.status(201).json({
    message: `Adoption request received. We will contact you at ${email} for further details.`,
  });
});

router.get("/error", (req, res) => {
  throw new Error("Interal Server Error");
});

module.exports = router;
