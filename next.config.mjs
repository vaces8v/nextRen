/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	devIndicators: {
		buildActivity: false
	},
	async headers() {
		return [
			{
				source: '/favicon.ico',
				headers: [
					{
						key: 'Content-Type',
						value: 'image/x-icon',
					},
				],
			},
		];
	},
};

export default nextConfig;
