const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getAllPurchases,
    getPurchaseById,
    createPurchase,
    getPurchaseByDriverId,
    getPurchasesCount
} = require("./purchase.controller");

router.post("/", checkToken, createPurchase);
router.get("/", checkToken, getAllPurchases);
router.get("/:id", checkToken, getPurchaseByDriverId);
router.get("/count/:id", checkToken, getPurchasesCount);
module.exports = router;
