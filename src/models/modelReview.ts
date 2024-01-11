import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
	id_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	id_order: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "orders",
	},
	rating: Number,
	kritik: String,
	saran: String,
});

const Review = mongoose.model("Review", reviewSchema, "reviews");
module.exports = Review;
