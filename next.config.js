const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		MONGO_URL: "mongodb+srv://listo:avibarigal@cluster0.b0kwwtf.mongodb.net/?retryWrites=true&w=majority",
		AUTH_SECRET: "1b3120d056c57bc5e2a22f2369bedb01"
	},
	reactStrictMode: false,
}

module.exports = withPWA(nextConfig);
