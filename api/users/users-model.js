const db = require("../data/db-config");

const findAll = () => {
  return db("users_table");
};

const findById = (id) => {
  return db("users_table").where("user_id", id).first();
};

const findBy = (filter) => {
  return db("users_table").select("user_id", "password").where(filter);
};

const addUser = async (user) => {
  const newUser = await db("users_table").insert(user, ["email"]);
  return newUser;
};

module.exports = {
  findAll,
  findById,
  findBy,
  addUser,
};
