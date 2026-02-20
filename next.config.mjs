/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        // Work around Windows Turbopack persistence issues (SST write failures)
        turbopackFileSystemCacheForDev: false,
        turbopackFileSystemCacheForBuild: false,
    },
};

export default nextConfig;
