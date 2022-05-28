const { Magic } = require("@magic-sdk/admin");
const magic = new Magic(process.env.MAGIC_SECRET_KEY);
const Users = require("./users/users-model");

const checkValidDIDToken = async (req, res, next) => {
  const didToken = req.headers.authorization.substr(7);
  try {
    await magic.token.validate(didToken);
    req.token = didToken;
    next();
  } catch (err) {
    next({ status: 401, message: err.message });
  }
};

const checkLoginCredentialExist = async (req, res, next) => {
  const { didToken } = req.token;
  try {
    const { issuer, email, publicAddress } =
      await magic.users.getMetadataByToken(didToken);
    const response = await Users.findByIssuerID(issuer);
    if (response) {
      next();
    }
    const user = {
      user_issuer: issuer,
      user_credential: email,
      user_public_address: publicAddress,
    };
    await Users.addUser(user).then((user) => {
      console.log(user);
      next().catch(next);
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkValidDIDToken,
  checkLoginCredentialExist,
};
