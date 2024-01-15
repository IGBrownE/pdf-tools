"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"

import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-seccess";
import { register } from "@/actions/auth-actions";
import { useState, useTransition } from "react";

export const RegisterForm = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			username: "",
			email: "",
			password: ""
		}
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError("");
		setSuccess("");

		startTransition(async () => {
			const registerResponse = await register(values);
			setError(registerResponse.error);
			setSuccess(registerResponse.success);
		})
	}

	return (
		<CardWrapper
			headerLabel="Welcome to Listo"
			backButtonLabel="Already have an account?"
			backButtonHref="/login"
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="john.doe@outlook.com"
											autoComplete="off"
											maxLength={50}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							disabled={isPending}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="******"
											type="password"
											autoComplete="off"
											maxLength={50}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							disabled={isPending}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="John Lennon"
											autoComplete="off"
											maxLength={50}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							disabled={isPending}
						/>

						<FormError message={error} />
						<FormSuccess message={success} />

						<Button
							type="submit"
							className="w-full"
							disabled={isPending}
						>
							Create an account
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	)
}
