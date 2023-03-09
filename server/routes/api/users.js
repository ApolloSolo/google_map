const router = require("express").Router();
const {
  getUsers,
  registerUser,
  login,
  logout,
  getUser,
  changePassword,
  editUserData,
  emailPasswordReset,
  resetPassword
} = require("../../controllers/users");
const protected = require("../../middleware/auth");

/* GET users listing. */
router.get("/", protected, getUsers);
router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgotpassword", emailPasswordReset);
router.get("/:id", getUser);
router.patch("/update/edit", protected, editUserData);
router.put("/change_pw", protected, changePassword);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;

// /api/user/update