import { dbConnect } from "@/lib/db";
import User from "@/models/User";

export const getUserById = async (id: string) => {
	try {

		await dbConnect();
		const user = await User.findOne({ _id: id });
		return user

	} catch (error) {
		return null
	}
}
export const getUserByEmail = async (email: string) => {
	try {

		await dbConnect();
		const user = await User.findOne({ email });
		return user

	} catch (error) {
		return null
	}
}
export const getUserByUsername = async (username: string) => {
	try {

		await dbConnect();
		const user = await User.findOne({ username });
		return user

	} catch (error) {
		return null
	}
}