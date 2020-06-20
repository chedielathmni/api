const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  login,
  getUserByUserId,
  getUsers,
  createUser,
  updatePassword
} = require("./user.controller");

router.post("/login", login);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.post("/", createUser);
router.put("/:id", checkToken, updatePassword)
//router.patch("/", checkToken, updateUsers);
//router.delete("/", checkToken, deleteUser);

module.exports = router;
