const router = require("express").Router();
const Users = require("./users-model");
const {
  checkValidDIDToken,
  checkLoginCredentialExist,
} = require("../middleware");

router.get("/", (req, res, next) => {
  Users.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.post(
  "/register",
  checkValidDIDToken,
  checkLoginCredentialExist,
  (req, res) => {
    res.status(200);
  }
);

module.exports = router;
