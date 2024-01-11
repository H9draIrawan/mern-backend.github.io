import express, { Router, Request, Response } from "express";

const router: Router = express.Router();
const controller = require("../controllers/controllerReview");

router.get("/", controller.getAllReviews);
router.get("/:id", controller.getReviewbyId);
router.get("/user/:id", controller.getReviewbyUserId);
router.post("/", controller.createReview);
router.put("/:id", controller.updateReview);
router.delete("/:id", controller.deleteReview);

module.exports = router;
