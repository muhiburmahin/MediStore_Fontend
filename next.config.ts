/**
 * @type {import('next').NextConfig}
 * Use `next build --webpack` in package.json: Next 16’s default Turbopack build can omit/break Tailwind v4 CSS on Vercel; webpack matches `next dev --webpack`.
 */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'res.cloudinary.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'i.pravatar.cc' },
            { protocol: 'https', hostname: '**.googleusercontent.com' },
            { protocol: 'https', hostname: 'cdn-icons-png.flaticon.com' },
            { protocol: 'https', hostname: 'via.placeholder.com' },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '5mb',
        },
    },
    async rewrites() {
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000";
        return [
            {
                source: "/api/auth/:path*",
                destination: `${backend}/api/auth/:path*`,
            },
            {
                source: "/api/v1/auth/:path*",
                destination: `${backend}/api/v1/auth/:path*`,
            },
            {
                source: "/api/notifications",
                destination: `${backend}/api/notifications`,
            },
            {
                source: "/api/notifications/:path*",
                destination: `${backend}/api/notifications/:path*`,
            },
            {
                source: "/api/wishlist",
                destination: `${backend}/api/wishlist`,
            },
            {
                source: "/api/wishlist/:path*",
                destination: `${backend}/api/wishlist/:path*`,
            },
            {
                source: "/api/orders",
                destination: `${backend}/api/orders`,
            },
            {
                source: "/api/orders/:path*",
                destination: `${backend}/api/orders/:path*`,
            },
        ];
    },
};

export default nextConfig;