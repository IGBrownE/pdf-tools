"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/auth-actions";
import { useState, useTransition } from "react";

export const LoginForm = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		startTransition(async () => {
			const loginResponse = await login(values);
			setError(loginResponse.error);
			setSuccess(loginResponse.success);
		})
	}

	return (
		<CardWrapper
			headerLabel="Welcome back"
			backButtonLabel="Don't have an account?"
			backButtonHref="/register"
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
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button
							type="submit"
							className="w-full"
							disabled={isPending}
						>
							Login
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	)
}
