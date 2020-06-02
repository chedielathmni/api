const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getCar
} = require("./cars.controller");

router.get("/:id", getCar);

module.exports = router;
