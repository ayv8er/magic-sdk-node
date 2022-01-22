const router = require("express").Router();
const Users = require("./users-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");

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

router.post("/register", (req, res, next) => {
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
});

router.post("/login", async (req, res, next) => {
  const { user_email, user_password } = req.body;

  const realUser = await Users.findByEmail(user_email);
  if (realUser && bcrypt.compareSync(user_password, realUser.user_password)) {
    const token = generateToken(realUser);
    res.status(200).json({
      message: `Welcome back ${realUser.user_email}`,
      token,
    });
  } else {
    next({ status: 401, message: "invalid credentials " });
  }
});

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
