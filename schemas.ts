import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email("Email is required").max(50, "Max 50 charachters"),
	password: z.string().min(1, "Password is required").max(50, "Max 50 charachters")
})
export const RegisterSchema = z.object({
	username: z.string().min(6, "Minimum of 6 charachters").max(50, "Max 50 charachters"),
	email: z.string().email("Email is required").max(50, "Max 50 charachters"),
	password: z.string().min(6, "Minimum of 6 charachters").max(50, "Max 50 charachters")
})