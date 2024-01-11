import express, { Router, Request, Response } from "express";

const router: Router = express.Router();
const controller = require("../controllers/controllerOrder");

router.get("/", controller.getAllOrders);
router.get("/:id", controller.getOrderbyId);
router.get("/user/:id", controller.getOrderbyUserId);
router.post("/", controller.createOrder);
router.put("/:id", controller.updateOrder);
router.put("/finish/:id", controller.finishOrder);
router.delete("/:id", controller.deleteOrder);

module.exports = router;
