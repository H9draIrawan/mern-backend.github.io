import { Request, Response } from "express";
import mongoose from "mongoose";
const Order = require("../models/modelOrder");

const getAllOrders = async (req: Request, res: Response) => {
	try {
		const orders = await Order.aggregate([
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
					from: "pets",
					localField: "details.id_pet",
					foreignField: "_id",
					as: "pets",
				},
			},
			{
				$project: {
					_id: 1,
					status: 1,
					details: 1,
					tanggal: 1,
					pets: 1,
					user: {
						$arrayElemAt: ["$user", 0],
					},
					total: { $sum: "$details.harga" },
				},
			},
		]);
		return res.status(200).json(orders);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const getOrderbyId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const order = await Order.aggregate([
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
					from: "pets",
					localField: "details.id_pet",
					foreignField: "_id",
					as: "pets",
				},
			},
			{
				$project: {
					_id: 1,
					status: 1,
					details: 1,
					tanggal: 1,
					pets: 1,
					user: {
						$arrayElemAt: ["$user", 0],
					},
					total: { $sum: "$details.harga" },
				},
			},
		]);
		return res.status(200).json(order);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const getOrderbyUserId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const order = await Order.aggregate([
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
					from: "pets",
					localField: "details.id_pet",
					foreignField: "_id",
					as: "pets",
				},
			},
			{
				$project: {
					_id: 1,
					status: 1,
					details: 1,
					tanggal: 1,
					pets: 1,
					user: {
						$arrayElemAt: ["$user", 0],
					},
					total: { $sum: "$details.harga" },
				},
			},
		]);
		return res.status(200).json(order);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const createOrder = async (req: Request, res: Response) => {
	try {
		const { id_user, details, tanggal } = req.body;
		Order.create({
			id_user: id_user,
			details: details,
			tanggal: tanggal
		});
		return res.status(200).json({ message: "Order created" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const updateOrder = async (req: Request, res: Response) => {
	try {
		const { details, tanggal } = req.body;
		const { id } = req.params;

		const newOrder = await Order.findByIdAndUpdate(
			id,
			{
				details: details,
				tanggal: tanggal,
			},
			{ new: true },
		);

		return res.status(200).json(newOrder);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const finishOrder = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const newOrder = await Order.findByIdAndUpdate(
			id,
			{
				status: true,
			},
			{ new: true },
		);

		return res.status(200).json(newOrder);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const deleteOrder = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Order.findByIdAndDelete(id);
		return res.status(200).json({ message: "Order deleted" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

module.exports = {
	getAllOrders,
	getOrderbyId,
	getOrderbyUserId,
	createOrder,
	updateOrder,
	finishOrder,
	deleteOrder,
};
