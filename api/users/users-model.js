const db = require("../data/db-config");

const findAll = () => {
  return db("users_table");
};

const findByEmail = (email) => {
  return db("users_table").where("user_email", email).first();
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

const deleteUser = async (id) => {
  const deletedUser = await db("users_table").where("user_id", id).del();
  return deletedUser;
};

module.exports = {
  findAll,
  findByEmail,
  addUser,
  updateUser,
  deleteUser,
};
