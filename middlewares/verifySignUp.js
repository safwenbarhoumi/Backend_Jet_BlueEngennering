const db = require("../models");

const ROLES = db.ROLES;
const User = db.user;

checkDuplicatedphone = async (req, res, next) => {
  phone = req.body.phone;
  try {
    const user = await findOne({ phone: phone });
    console.log("user", user);

    if (user) {
      res.status(400).send({ message: "Failed! phone is already in use!" });
      return;
    }
  } catch (err) {
    console.error(err);
    return;
  }

  next();
};

// checkRolesExisted = (req, res, next) => {
//     if (req.body.roles) {
//         for (let i = 0; i < req.body.roles.length; i++) {
//             if (!ROLES.includes(req.body.roles[i])) {
//                 res.status(400).send({
//                     message: `Failed! Role ${req.body.roles[i]} does not exist!`
//                 });
//                 return;
//             }
//         }
//     }

//     next();
// };

const verifySignUp = {
  checkDuplicatedphone,
  //   checkRolesExisted,
};

module.exports = verifySignUp;
