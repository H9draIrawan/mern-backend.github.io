import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
	id_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	id_order: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "orders",
	},
	id_invoice: String,
	harga: Number,
	status: String,
	created: Date,
	updated: Date,
});

const Transaction = mongoose.model(
	"Transaction",
	transactionSchema,
	"transactions",
);
module.exports = Transaction;
