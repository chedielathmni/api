const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    sendAlert
} = require("./alerts.controller");

router.post("/", sendAlert);

module.exports = router;
