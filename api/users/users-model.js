const db = require("../data/db-config");

const findAll = () => {
  return db("users_table");
};

const findBy = (filter) => {
  return db("users_table").select("user_id", "user_email").where(filter);
};

const addUser = async (user) => {
  const newUser = await db("users_table").insert(user, [
    "user_email",
    "user_password",
  ]);
  return newUser;
};

const updateUser = async (id, changes) => {
  const updatedUser = await db("users_table")
    .where("user_id", id)
    .update(changes, ["user_email", "user_password"]);
  return updatedUser;
};

module.exports = {
  findAll,
  findBy,
  addUser,
  updateUser,
};
