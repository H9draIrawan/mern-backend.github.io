import express, { Express } from "express";
import mongoose from "mongoose";
import routes from "./src/routes/index";

require("dotenv").config();

const app: Express = express();
const port = process.env.PORT;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	origin: "https://mern-frontend-murex.vercel.app",
	optionsSuccessStatus: 200,
	method : ['GET','POST','PUT','DELETE'],
	credentials: true
}));
app.use("/static", express.static("assets"));
app.use("/api", routes);

app.listen(port, () => {
	mongoose
		.connect(
			"mongodb+srv://PetShop:RCq1USFZ2LqkajcG@cluster.j2huuni.mongodb.net/?retryWrites=true&w=majority",
		)
		.then(() => {
			console.log("Database connected");
			console.log(`[server]: Server is running at http://localhost:${port}`);
		});
});
