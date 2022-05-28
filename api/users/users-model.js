const db = require("../data/db-config");

const findAll = () => {
  return db("users_table");
};

const findByIssuerID = (ID) => {
  return db("users_table").where("user_issuer", ID).first();
};

const findByLoginCredential = (credential) => {
  return db("users_table").where("user_credential", credential).first();
};

const findByPublicAddress = (address) => {
  return db("users_table").where("user_public_address", address).first();
};

const addUser = async (user) => {
  const newUser = await db("users_table").insert(user, [
    "user_issuer",
    "user_credential",
    "user_public_address",
  ]);
  return newUser;
};

const updateUser = async (id, changes) => {
  const updatedUser = await db("users_table")
    .where("user_issuer", id)
    .update(changes, ["user_credential"]);
  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await db("users_table").where("user_issuer", id).del();
  return deletedUser;
};

module.exports = {
  findAll,
  findByIssuerID,
  findByLoginCredential,
  findByPublicAddress,
  addUser,
  updateUser,
  deleteUser,
};
