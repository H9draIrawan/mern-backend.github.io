import { Request, Response } from "express";
import mongoose from "mongoose";
const Review = require("../models/modelReview");

const getAllReviews = async (req: Request, res: Response) => {
	try {
		const reviews = await Review.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "id_user",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$lookup: {
					from: "orders",
					localField: "id_order",
					foreignField: "_id",
					as: "order",
				},
			},
			{
				$project: {
					_id: 1,
					rating: 1,
					kritik: 1,
					saran: 1,
					user: {
						$arrayElemAt: ["$user", 0],
					},
					order: {
						$arrayElemAt: ["$order", 0],
					},
				},
			},
		]);
		return res.status(200).json(reviews);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const getReviewbyId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const review = await Review.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "id_user",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$lookup: {
					from: "orders",
					localField: "id_order",
					foreignField: "_id",
					as: "order",
				},
			},
			{
				$project: {
					_id: 1,
					rating: 1,
					kritik: 1,
					saran: 1,
					user: {
						$arrayElemAt: ["$user", 0],
					},
					order: {
						$arrayElemAt: ["$order", 0],
					},
				},
			},
		]);
		return res.status(200).json(review);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const getReviewbyUserId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const review = await Review.aggregate([
			{
				$match: {
					id_user: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "id_user",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$lookup: {
					from: "orders",
					localField: "id_order",
					foreignField: "_id",
					as: "order",
				},
			},
			{
				$project: {
					_id: 1,
					rating: 1,
					kritik: 1,
					saran: 1,
					user: {
						$arrayElemAt: ["$user", 0],
					},
					order: {
						$arrayElemAt: ["$order", 0],
					},
				},
			},
		]);
		return res.status(200).json(review);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const createReview = async (req: Request, res: Response) => {
	try {
		const { id_user, id_order, rating, kritik, saran } = req.body;
		Review.create({
			id_user: id_user,
			id_order: id_order,
			rating: rating,
			kritik: kritik,
			saran: saran,
		});
		return res.status(200).json({ message: "Review created" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const updateReview = async (req: Request, res: Response) => {
	try {
		const { rating, kritik, saran } = req.body;
		const { id } = req.params;

		const newReview = await Review.findByIdAndUpdate(
			id,
			{
				rating: rating,
				kritik: kritik,
				saran: saran,
			},
			{ new: true },
		);

		return res.status(200).json(newReview);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const deleteReview = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Review.findByIdAndDelete(id);
		return res.status(200).json({ message: "Review deleted" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

module.exports = {
	getAllReviews,
	getReviewbyId,
	getReviewbyUserId,
	createReview,
	updateReview,
	deleteReview,
};
