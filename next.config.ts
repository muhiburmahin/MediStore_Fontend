/** @type {import('next').NextConfig} */
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
        return [
            {
                source: "/api/auth/:path*",
                destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
            },
        ];
    },
};

export default nextConfig;