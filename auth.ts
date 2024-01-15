import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	providers: [GitHub],
} satisfies NextAuthConfig)