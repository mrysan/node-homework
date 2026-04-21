const { StatusCodes } = require("http-status-codes");

const register = (req, res) => {
  const newUser = { ...req.body }; // this makes a copy
  global.users.push(newUser);
  global.user_id = newUser; // After the registration step, the user is set to logged on.
  delete req.body.password;
  res.status(StatusCodes.CREATED).json(req.body);
};

const logon = (req, res) => {
  const userLogin = { ...req.body };

  const found = global.users.find((user) => {
    return (
      user.email === userLogin.email && user.password === userLogin.password
    );
  });

  if (found) {
    console.log("Logged In!");
    global.user_id = found;
    res.status(StatusCodes.OK).json({ email: found.email, name: found.name });
  } else {
    res
      .json({ message: "Authentication Failed" })
      .status(StatusCodes.UNAUTHORIZED);
  }
};

const logoff = (req, res) => {
  global.user_id = null;
  res.status(StatusCodes.OK);
};
module.exports = { register, logon, logoff };
