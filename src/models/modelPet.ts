import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
	id_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	profile: String,
	nama: String,
	umur: String,
	jenis: String,
	ras: String,
	status: {
		type: Boolean,
		default: true,
	},
});

const Pet = mongoose.model("Pet", petSchema, "pets");
module.exports = Pet;
