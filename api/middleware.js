const Users = require("./users/users-model");

const checkCredentialsBody = (req, res, next) => {
  const { user_email, user_password } = req.body;
  if (
    !user_email ||
    user_email.trim() === "" ||
    typeof user_email !== "string" ||
    !user_password
  ) {
    return next({ status: 400, message: "email and password required" });
  }
  next();
};

const checkUserEmailFree = async (req, res, next) => {
  try {
    const { user_email } = req.body;
    const existing = await Users.findByEmail(user_email);
    if (existing) {
      res.status(422).json({ message: "email address is taken" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkUserEmailExist = async (req, res, next) => {
  try {
    const { user_email } = req.body;
    const existing = await Users.findByEmail(user_email);
    if (!existing) {
      res.status(401).json({ message: "invalid credentials" });
    } else {
      req.user = existing;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCredentialsBody,
  checkUserEmailFree,
  checkUserEmailExist,
};
