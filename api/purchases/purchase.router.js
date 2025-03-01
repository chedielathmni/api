const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    getAllPurchases,
    getPurchaseById,
    createPurchase,
    getPurchaseByDriverId,
    getPurchasesCount
} = require("./purchase.controller");

router.post("/", createPurchase);
router.get("/", getAllPurchases);
router.get("/:id", getPurchaseByDriverId);
router.get("/count/:id", getPurchasesCount);
module.exports = router;
