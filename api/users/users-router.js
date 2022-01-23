const router = require("express").Router();
const Users = require("./users-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");
const {
  checkCredentialsBody,
  checkUserEmailFree,
  checkUserEmailExist,
} = require("../middleware");

router.get("/", (req, res, next) => {
  Users.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.delete("/delete/:user_id", (req, res, next) => {
  const { user_id } = req.params;
  Users.deleteUser(user_id)
    .then(() => {
      res.status(200).json({ message: "User profile has been deleted" });
    })
    .catch(next);
});

router.post(
  "/register",
  checkCredentialsBody,
  checkUserEmailFree,
  (req, res, next) => {
    const { user_password } = req.body;
    let user = req.body;
    const hash = bcrypt.hashSync(user.user_password, 8);
    user.user_password = hash;

    Users.addUser(user)
      .then((newUser) => {
        bcrypt.compareSync(user_password, newUser[0].user_password);
        const token = generateToken(newUser[0]);
        res.status(201).json({
          message: `Welcome ${newUser[0].user_email}`,
          token,
        });
      })
      .catch(next);
  }
);

router.post(
  "/login",
  checkCredentialsBody,
  checkUserEmailExist,
  async (req, res, next) => {
    const { user_password } = req.body;

    if (req.user && bcrypt.compareSync(user_password, req.user.user_password)) {
      const token = generateToken(req.user);
      res.status(200).json({
        message: `Welcome back ${req.user.user_email}`,
        token,
      });
    } else {
      next({ status: 401, message: "invalid credentials " });
    }
  }
);

function generateToken(user) {
  const payload = {
    user_id: user.user_id,
    user_email: user.user_email,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;
