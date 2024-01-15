"use server"

import { RegisterSchema, LoginSchema } from "@/schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { getUserByEmail, getUserByUsername } from "@/data/users";
import User from "@/models/User";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) return { error: "Invalid fields" }

	// Create new user
	const { email, password, username } = validatedFields.data;

	try {

		let user = await getUserByEmail(email);
		if (user) return { error: "Email is already in use" }
		else user = await getUserByUsername(username);
		if (user) return { error: "Username is taken" }

		const salt = await bcryptjs.genSalt(10);
		const hashedPasssword = await bcryptjs.hash(password, salt);


		user = new User({
			email,
			username,
			password: hashedPasssword
		})
		await user.save();

		return { success: "User created successfully" }

	} catch (error) {
		console.error(error);
		return { error: "Something went wrong" }
	}
}

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) return { error: "Invalid fields" }
	const { email, password } = validatedFields.data;

	try {

		let user = await getUserByEmail(email);
		if (!user) return { error: "Invalid credentials" }

		const isMatch = await bcryptjs.compare(password, user.password);
		if (!isMatch) return { error: "Invalid credentials" }
	} catch (error) {
		console.error(error);
		return { error: "Invalid credentials" }
	}

	return { success: "Login successfuly!" }
}