/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    poweredByHeader: false,
    compress: true,

    // Optimize page loading
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

    // Font optimization
    optimizeFonts: true,

    // Enhanced image optimization
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'peyzpnmmgsxjydvpussg.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/dzrdlevfn/**',
            },
            {
                protocol: 'https',
                hostname: 'api.producthunt.com',
                pathname: '/widgets/embed-image/v1/**',
            },
            {
                protocol: 'https',
                hostname: 'fal.media',
                pathname: '/files/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ],
        unoptimized: true,
        minimumCacheTTL: 60,
    },

    // Enhanced headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'credentialless',
                    },
                    {
                        key: 'Cache-Control',
                        value: process.env.NODE_ENV === 'production'
                            ? 'public, max-age=150000, stale-while-revalidate=86400'
                            : 'no-cache, no-store, must-revalidate',
                    }
                ],
            },
        ];
    },
};

module.exports = nextConfig; 