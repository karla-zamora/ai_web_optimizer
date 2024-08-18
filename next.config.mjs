/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config, { isServer }) {
        // Custom Webpack configuration to load mp4 videos
        config.module.rules.push({
            test: /\.mp4$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: `/_next/static/videos/`,
                    outputPath: `${isServer ? '../' : ''}static/videos/`,
                    name: '[name].[hash].[ext]',
                    esModule: false,
                },
            },
        });

        return config;
    },
};

export default nextConfig;
