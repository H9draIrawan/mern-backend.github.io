import express, { Router, Request, Response } from "express";
import path from "path";

const router: Router = express.Router();
const controller = require("../controllers/controllerPet");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req: any, file: any, cb: any) {
		cb(null, "assets");
	},
	filename: function (req: any, file: any, cb: any) {
		const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

router.get("/", controller.getAllPets);
router.get("/:id", controller.getPetbyId);
router.get("/user/:id", controller.getPetbyUserId);
router.post("/", upload.single("profile"), controller.createPet);
router.put("/:id", controller.updatePet);
router.put("/profile/:id", upload.single("profile"), controller.updateProfile);
router.put("/banned/:id", controller.bannedPet);
router.put("/unbanned/:id", controller.unbannedPet);
router.delete("/:id", controller.deletePet);

module.exports = router;
