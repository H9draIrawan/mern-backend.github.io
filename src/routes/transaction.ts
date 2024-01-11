import express, { Router, Request, Response } from "express";

const router: Router = express.Router();
const controller = require("../controllers/controllerTransaction");

router.get("/", controller.getAllTransactions);
router.get("/:id", controller.getTransactionbyId);
router.get("/user/:id", controller.getTransactionbyUserId);
router.post("/", controller.createTransaction);
router.post("/webhook", controller.updateTransaction);
router.put("/cancel/:id", controller.cancelTransaction);
router.delete("/:id", controller.deleteTransaction);

module.exports = router;
