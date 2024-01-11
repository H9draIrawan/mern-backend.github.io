import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	id_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	details: [
		{
			_id: false,
			id_pet: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "pets",
			},
			kategori: [String],
			harga: Number,
		},
	],
	tanggal: Date,
	status: {
		type: Boolean,
		default: false,
	},
});

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
