import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null };
}

export const dbConnect = async () => {
	if (cached.conn) return cached.conn;

	cached.conn = await mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	console.log("mongoDB Connected");

	return cached.conn;
};