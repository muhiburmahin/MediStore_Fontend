/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
            },
            // ভবিষ্যতে অন্য কোনো সোর্স ব্যবহার করলে তার জন্য
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;