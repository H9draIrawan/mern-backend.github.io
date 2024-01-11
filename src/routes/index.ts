import express, { Router } from "express";
// Routers
const user = require("./user");
const pet = require("./pet");
const order = require("./order");
const review = require("./review");
const transaction = require("./transaction");

const router: Router = express.Router();

router.use("/user", user);
router.use("/pet", pet);
router.use("/order", order);
router.use("/review", review);
router.use("/transaction", transaction);

export default router;
